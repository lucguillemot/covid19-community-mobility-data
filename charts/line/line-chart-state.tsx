import {
  extent,
  group,
  max,
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
  x: { dimension: keyof T; domain?: Date[] };
  y: { dimension: keyof T; domain?: [number, number] };
  color: { dimension: keyof T; domain?: string[]; range?: string[] };
  strokeWidth: {
    dimension: keyof T;
    domain?: string[];
    range?: number[];
  };
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
  getStrokeWidth: (d: T) => string;
  strokeWidthScale: ScaleOrdinal<string, number>;
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
    (d: T): Date => new Date(`${d[encoding.x.dimension]}`),
    [encoding.x]
  );
  const xDomain =
    encoding.x.domain ?? (extent(data, (d) => getX(d)) as [Date, Date]);
  const xScale = scaleTime().domain(xDomain);

  // Y
  const getY = React.useCallback(
    (d: T): number | null => {
      const v = d[encoding.y.dimension];
      return v !== null ? +v : null;
    },
    [encoding.y]
  );
  const yDomain = encoding.y.domain ?? [
    min(data, (d) => getY(d)) ?? 0,
    max(data, (d) => getY(d)) ?? 0,
  ];
  const yScale = scaleLinear().domain(yDomain).nice();

  // Color
  const getColor = React.useCallback(
    (d: T): string => `${d[encoding.color.dimension]}`,
    [encoding.color]
  );
  const colorDomain = encoding.color.domain ?? [...new Set(data.map(getColor))];
  const colorScale = scaleOrdinal<string, string>()
    .domain(colorDomain)
    .range(encoding.color.range ?? schemeSet2);

  // Stroke width
  const getStrokeWidth = React.useCallback(
    (d: T): string => `${d[encoding.color.dimension]}`,
    [encoding.color]
  );
  const strokeWidthDomain = encoding.strokeWidth.domain ?? [
    ...new Set(data.map(getStrokeWidth)),
  ];
  const strokeWidthScale = scaleOrdinal<string, number>()
    .domain(strokeWidthDomain)
    .range(encoding.strokeWidth.range ?? [1]);

  // Data preparation
  const grouped = group(data, getColor);

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
    getStrokeWidth,
    strokeWidthScale,
    grouped,
  };
}
