import { useLineChart } from "./line-chart-state-provider";
import { useChartTheme } from "../use-chart-theme";

export const RuleY = ({ value, label }: { value: number; label?: string }) => {
  const { yScale, bounds } = useLineChart();

  const { domainColor, labelFontSize } = useChartTheme();

  return (
    <g transform={`translate(${bounds.margins.left} ${bounds.margins.top})`}>
      <>
        <line
          x1={0}
          y1={yScale(value)}
          x2={bounds.chartWidth}
          y2={yScale(value)}
          stroke={domainColor}
        />
        {label && (
          <text
            x={0}
            y={yScale(value)}
            dy={-6}
            fill={domainColor}
            fontSize={labelFontSize}
          >
            {label}
          </text>
        )}
      </>
    </g>
  );
};
