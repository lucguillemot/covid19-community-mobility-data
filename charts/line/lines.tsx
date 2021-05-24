import { line } from "d3";
import { Fragment, memo } from "react";
import { useLineChart } from "./line-chart-state-provider";

export function MultiLines() {
  const { getX, xScale, getY, yScale, grouped, colorScale, bounds } =
    useLineChart();

  const lineGenerator = line()
    .defined((d) => getY(d) !== null)
    .x((d) => xScale(getX(d)))
    .y((d) => yScale(getY(d) as number));

  return (
    <g transform={`translate(${bounds.margins.left} ${bounds.margins.top})`}>
      {Array.from(grouped).map((observation, index) => {
        return (
          <Fragment key={observation[0]}>
            <Line
              key={index}
              path={lineGenerator(observation[1]) as string}
              color={colorScale(observation[0])}
            />
          </Fragment>
        );
      })}
    </g>
  );
}

const Line = memo(
  ({ path, color, width }: { path: string; color: string; width?: number }) => {
    return <path d={path} stroke={color} fill="none" width={width ?? 1} />;
  }
);
