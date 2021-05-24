import { axisLeft, select, Selection } from "d3";
import { useEffect, useRef } from "react";
import { useChartTheme } from "../use-chart-theme";
import { useFormatPercent } from "../use-format-number";
import { useAreaChart } from "./area-chart-state-provider";

const TICK_MIN_HEIGHT = 50;

export const AreaAxisHeightLinear = () => {
  const ref = useRef<SVGGElement>(null);
  const formatNumber = useFormatPercent();

  const { yScale, bounds } = useAreaChart();

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
    <g
      ref={ref}
      transform={`translate(${bounds.margins.left}, ${bounds.margins.top})`}
    />
  );
};
