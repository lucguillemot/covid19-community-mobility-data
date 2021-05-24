import { ReactNode } from "react";
import { useAreaChart } from "./area-chart-state-provider";

export const AreaChartContainer = ({ children }: { children: ReactNode }) => {
  const { bounds } = useAreaChart();
  const { width, height } = bounds;
  return (
    <figure aria-hidden="true" style={{ position: "relative", width, height }}>
      {children}
    </figure>
  );
};

export const AreaChartSvg = ({ children }: { children: ReactNode }) => {
  const { bounds } = useAreaChart();
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
