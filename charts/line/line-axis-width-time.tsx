import { axisBottom } from "d3";
import { select, Selection } from "d3";

import { useEffect, useRef } from "react";
import { useLineChart } from "./line-chart-state-provider";
import { useChartTheme } from "../use-chart-theme";

// Approximate the longest date format
// Roughly equivalent to estimateTextWidth("99.99.9999", 12);
const MAX_DATE_LABEL_LENGHT = 70;

export const LineAxisTime = () => {
  const ref = useRef<SVGGElement>(null);

  const { xScale, yScale, bounds } = useLineChart();

  const { labelColor, gridColor, domainColor, labelFontSize, fontFamily } =
    useChartTheme();

  const hasNegativeValues = yScale.domain()[0] < 0;
  const ticks = bounds.chartWidth / (MAX_DATE_LABEL_LENGHT + 20);

  const mkAxis = (g: Selection<SVGGElement, unknown, null, undefined>) => {
    g.call(axisBottom(xScale).ticks(ticks).tickSizeOuter(0));

    g.selectAll(".tick line").attr(
      "stroke",
      hasNegativeValues ? gridColor : domainColor
    );
    g.selectAll(".tick text")
      .attr("font-size", labelFontSize)
      .attr("font-family", fontFamily)
      .attr("fill", labelColor);
  };

  useEffect(() => {
    const g = select(ref.current);
    mkAxis(g as Selection<SVGGElement, unknown, null, undefined>);
  });

  return (
    <g
      ref={ref}
      transform={`translate(${bounds.margins.left}, ${
        bounds.chartHeight + bounds.margins.top
      })`}
    />
  );
};
