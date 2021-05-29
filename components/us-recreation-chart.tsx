import * as React from "react";
import { Area } from "../charts/area/area";
import { AreaAxisHeightLinear } from "../charts/area/area-axis-height-linear";
import { AreaAxisTime } from "../charts/area/area-axis-width-time";
import { AreaChart } from "../charts/area/area-chart-state-provider";
import {
  AreaChartContainer,
  AreaChartSvg,
} from "../charts/area/area-container";
import { AreaRuleY } from "../charts/area/area-rule-y";
// Data
import us_only_rolling_average_recreation from "../public/us_only_rolling_average_retail_recreation.json";

export const USRecreationplaceChart = () => {
  return (
    <AreaChart
      data={us_only_rolling_average_recreation}
      encoding={{
        x: "date",
        y: "ravg",
      }}
      margins={{
        top: 0,
        right: 0,
        bottom: 40,
        left: 40,
      }}
      aspectRatio={0.3}
    >
      <AreaChartContainer>
        <AreaChartSvg>
          <AreaAxisHeightLinear />
          <Area />
          <AreaRuleY value={0} />
          <AreaAxisTime />
        </AreaChartSvg>
      </AreaChartContainer>
    </AreaChart>
  );
};
