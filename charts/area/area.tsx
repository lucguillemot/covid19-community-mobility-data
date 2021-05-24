import { area, line } from "d3";
import * as React from "react";
import { Line } from "../line/lines";
import { useAreaChart } from "./area-chart-state-provider";

export function Area() {
  const { data, getX, xScale, getY, yScale, bounds } = useAreaChart();

  const negativeAreaGenerator = area()
    .x((d) => xScale(getX(d)))
    .y0(yScale(0))
    .y1((d) => yScale(Math.min(0, getY(d) ?? 0)));

  const positiveAreaGenerator = area()
    .x((d) => xScale(getX(d)))
    .y0(yScale(0))
    .y1((d) => yScale(Math.max(0, getY(d) ?? 0)));

  const negativeLineGenerator = line()
    .defined((d) => getY(d) !== null)
    .x((d) => xScale(getX(d)))
    .y((d) => yScale(Math.min(0, getY(d) ?? 0)));
  const positiveLineGenerator = line()
    .defined((d) => getY(d) !== null)
    .x((d) => xScale(getX(d)))
    .y((d) => yScale(Math.max(0, getY(d) ?? 0)));

  return (
    <g transform={`translate(${bounds.margins.left} ${bounds.margins.top})`}>
      <path
        d={positiveAreaGenerator(data) as string}
        fill="#00449E"
        fillOpacity={0.2}
      />
      <Line path={positiveLineGenerator(data) as string} color={"#00449E"} />
      <path
        d={negativeAreaGenerator(data) as string}
        fill="#FF6300"
        fillOpacity={0.2}
      />
      <Line path={negativeLineGenerator(data) as string} color={"#FF6300"} />
    </g>
  );
}
