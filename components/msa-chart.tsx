import * as CKA from "@chakra-ui/react";
import * as React from "react";
import { LegendColor } from "../charts/legend/legend-color";
import { LineAxisHeightLinear } from "../charts/line/line-axis-height-linear";
import { LineAxisTime } from "../charts/line/line-axis-width-time";
import { LineChart } from "../charts/line/line-chart-state-provider";
import { ChartContainer, ChartSvg } from "../charts/line/line-container";
import { MultiLines } from "../charts/line/lines";
import { RuleY } from "../charts/line/rule-y";
import { ChartTitle } from "../components/chart-title";
// Data
import msa from "../public/us_MSA_rolling_average_all_states.json";

export const MSAChart = () => {
  const [state, setState] = React.useState("California");
  const states = [...new Set(msa.map((d) => d.state))];

  const data = msa.filter((d) => d.state === state);

  return (
    <>
      <CKA.Select
        onChange={(e) => setState(e.currentTarget.value)}
        defaultValue={state}
      >
        {states.map((s) => (
          <option value={s}>{s}</option>
        ))}
      </CKA.Select>
      <LineChart
        data={data}
        encoding={{
          x: "date",
          y: "ravg",
          color: "metro_type",
          strokeWidth: "metro_type",
        }}
        margins={{
          top: 100,
          right: 40,
          bottom: 40,
          left: 40,
        }}
        aspectRatio={0.5}
      >
        <ChartContainer>
          <ChartSvg>
            <LineAxisTime />
            <LineAxisHeightLinear />
            <RuleY value={0} label="Baseline" />
            <MultiLines />
          </ChartSvg>
          <ChartTitle
            title={
              <>
                Mobility Trends for places of work in 2021, by county type. For
                each county type, the lines represent the median value of the
                7-day rolling average percentage difference to the baseline.
              </>
            }
          />
        </ChartContainer>
        <LegendColor symbol="line" />
      </LineChart>
    </>
  );
};
