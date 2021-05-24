import { ReactNode } from "react";
import { useLineChart } from "./line-chart-state-provider";

export const ChartContainer = ({ children }: { children: ReactNode }) => {
  const { bounds } = useLineChart();
  const { width, height } = bounds;
  return (
    <figure aria-hidden="true" style={{ position: "relative", width, height }}>
      {children}
    </figure>
  );
};

export const ChartSvg = ({ children }: { children: ReactNode }) => {
  const { bounds } = useLineChart();
  const { width, height } = bounds;
  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", left: 0, top: 0 }}
    >
      {children}
    </svg>
  );
};
