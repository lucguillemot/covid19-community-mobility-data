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
import { ChartTitle } from "./chart-title";
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
        top: 100,
        right: 40,
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
        <ChartTitle
          title="Mobility Trends for Retail and Recreation"
          description={
            <>
              Mobility Trends for places of work in the United States, 7-day
              rolling average of percentage difference to the zero baseline.
              <br />
              Feb 15, 2020 to May 9th, 2021.
            </>
          }
        />
      </AreaChartContainer>
    </AreaChart>
  );
};
