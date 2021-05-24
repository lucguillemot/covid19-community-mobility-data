import { axisLeft } from "d3";
import { select, Selection } from "d3";

import { useEffect, useRef } from "react";
import { useLineChart } from "../line/line-chart-state-provider";
import { useChartTheme } from "../use-chart-theme";
import { useFormatNumber } from "../use-format-number";

const TICK_MIN_HEIGHT = 50;

export const AxisHeightLinear = () => {
  const ref = useRef<SVGGElement>(null);
  const formatNumber = useFormatNumber();

  const { yScale, bounds } = useLineChart();

  const ticks = Math.min(bounds.chartHeight / TICK_MIN_HEIGHT, 4);

  const { labelColor, labelFontSize, gridColor, fontFamily } = useChartTheme();

  const mkAxis = (g: Selection<SVGGElement, unknown, null, undefined>) => {
    g.call(
      axisLeft(yScale)
        .ticks(ticks)
        .tickSizeInner(-bounds.chartWidth)
        .tickFormat(formatNumber)
    );

    g.select(".domain").remove();

    g.selectAll(".tick line").attr("stroke", gridColor).attr("stroke-width", 1);
    g.selectAll(".tick text")
      .attr("font-size", labelFontSize)
      .attr("font-family", fontFamily)
      .attr("fill", labelColor)
      .attr("x", -6)
      .attr("dy", 3)
      .attr("text-anchor", "end");
  };
  useEffect(() => {
    const g = select(ref.current);
    mkAxis(g as Selection<SVGGElement, unknown, null, undefined>);
  });

  return (
    <>
      <g></g>
      <g
        ref={ref}
        transform={`translate(${bounds.margins.left}, ${bounds.margins.top})`}
      />
    </>
  );
};
