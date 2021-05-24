import {
  extent,
  max,
  min,
  scaleLinear,
  ScaleLinear,
  scaleTime,
  ScaleTime,
} from "d3";
import * as React from "react";
import { Bounds, Margins, useWidth } from "../use-width";
export interface AreaChartencoding<T> {
  x: keyof T;
  y: keyof T;
}
export interface AreaChartProps<T> {
  data: T[];
  encoding: AreaChartencoding<T>;
  margins: Margins;
  aspectRatio: number;
}

export interface AreaChartState<T> {
  data: T[];
  bounds: Bounds;
  getX: (d: T) => Date;
  xScale: ScaleTime<number, number>;
  getY: (d: T) => number | null;
  yScale: ScaleLinear<number, number>;
}

export function useAreaChartState<T>({
  data,
  encoding,
  margins,
  aspectRatio,
}: AreaChartProps<T>) {
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
    max(data, (d) => getY(d)) ?? 0,
  ];
  const yScale = scaleLinear().domain(yDomain).nice();

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
  };
}
