import {
  extent,
  group,
  min,
  scaleLinear,
  ScaleLinear,
  scaleOrdinal,
  ScaleOrdinal,
  scaleTime,
  ScaleTime,
  schemeSet2,
} from "d3";
import * as React from "react";
import { Bounds, Margins, useWidth } from "../use-width";
export interface LineChartencoding<T> {
  x: keyof T;
  y: keyof T;
  color: keyof T;
  strokeWidth: keyof T;
}
export interface LineChartProps<T> {
  data: T[];
  encoding: LineChartencoding<T>;
  margins: Margins;
  aspectRatio: number;
}

export interface LineChartState<T> {
  data: T[];
  bounds: Bounds;
  getX: (d: T) => Date;
  xScale: ScaleTime<number, number>;
  getY: (d: T) => number | null;
  yScale: ScaleLinear<number, number>;
  getColor: (d: T) => string;
  colorScale: ScaleOrdinal<string, string>;
  grouped: Map<string, T[]>;
}

export function useLineChartState<T>({
  data,
  encoding,
  margins,
  aspectRatio,
}: LineChartProps<T>) {
  const width = useWidth();

  // X
  const getX = React.useCallback(
    (d: T): Date => new Date(`${d[encoding.x]}`),
    [encoding.x]
  );
  const xDomain = extent(data, (d) => getX(d)) as [Date, Date];
  const xScale = scaleTime().domain(xDomain);

  // Y
  const getY = React.useCallback(
    (d: T): number | null => {
      const v = d[encoding.y];
      return v !== null ? +v : null;
    },
    [encoding.y]
  );
  const yDomain = [
    min(data, (d) => getY(d)) ?? 0,
    0, //max(data, (d) => getY(d)) ?? 0,
  ];
  const yScale = scaleLinear().domain(yDomain).nice();

  // Color
  const getColor = React.useCallback(
    (d: T): string => `${d[encoding.color]}`,
    [encoding.color]
  );
  const colorDomain = [...new Set(data.map(getColor))];
  const colorScale = scaleOrdinal<string, string>()
    .domain(colorDomain)
    .range(schemeSet2);
  const grouped = group(data, getColor);

  // Stroke width
  const getStrokeWidth = React.useCallback(
    (d: T): string => `${d[encoding.color]}`,
    [encoding.color]
  );
  const strokeWidthDomain = [...new Set(data.map(getStrokeWidth))];
  const strokeWidthScale = scaleOrdinal()
    .domain(strokeWidthDomain)
    .range(strokeWidthDomain.map((_, i) => i + 1));

  // Chart dimensions
  const chartWidth = width - margins.left - margins.right;
  const chartHeight = chartWidth * aspectRatio;
  const bounds = {
    width,
    height: chartHeight + margins.top + margins.bottom,
    margins,
    chartWidth,
    chartHeight,
  };

  xScale.range([0, chartWidth]);
  yScale.range([chartHeight, 0]);

  return {
    data,
    bounds,
    getX,
    xScale,
    getY,
    yScale,
    getColor,
    colorScale,
    grouped,
  };
}
