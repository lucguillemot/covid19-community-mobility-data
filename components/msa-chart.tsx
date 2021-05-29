import * as CKA from "@chakra-ui/react";
import { ascending } from "d3";
import * as React from "react";
import { LegendColor } from "../charts/legend/legend-color";
import { LineAxisHeightLinear } from "../charts/line/line-axis-height-linear";
import { LineAxisTime } from "../charts/line/line-axis-width-time";
import { LineChart } from "../charts/line/line-chart-state-provider";
import { ChartContainer, ChartSvg } from "../charts/line/line-container";
import { MultiLines } from "../charts/line/lines";
import { RuleY } from "../charts/line/rule-y";
// Data
import msa from "../public/msa_states_work_recreation.json";

export const MSAChart = () => {
  const [state, setState] = React.useState("California");
  const [place, setPlace] = React.useState("ravgWork");

  const states = [...new Set(msa.map((d) => d.state))];
  const places = [
    { value: "ravgWork", label: "Places of work" },
    { value: "ravgRecreation", label: "Places of retail and recreation" },
  ];

  const data = msa
    .filter((d) => d.state === state || d.state === "US")
    .sort((a, b) => ascending(a.date, b.date));

  return (
    <>
      <CKA.FormLabel sx={{ mb: 1, fontWeight: 700 }} htmlFor="#select-place">
        Select a type of mobility
      </CKA.FormLabel>
      <CKA.RadioGroup id="select-place" onChange={setPlace} value={place}>
        <CKA.Stack direction="row">
          {places.map((s) => (
            <CKA.Radio sx={{ bg: "white" }} key={s.value} value={s.value}>
              {s.label}
            </CKA.Radio>
          ))}
        </CKA.Stack>
      </CKA.RadioGroup>

      <CKA.FormLabel
        sx={{ mt: 4, mb: 1, fontWeight: 700 }}
        htmlFor="#select-state"
      >
        Select a state
      </CKA.FormLabel>
      <CKA.Select
        id="select-state"
        onChange={(e) => setState(e.currentTarget.value)}
        defaultValue={state}
        sx={{ bg: "white" }}
      >
        {states.map((s, i) => (
          <option key={i} value={s}>
            {s}
          </option>
        ))}
      </CKA.Select>

      <LineChart
        data={data}
        encoding={{
          x: { dimension: "date" },
          y: { dimension: place, domain: [-55, 30] },
          color: {
            dimension: "countyType",
            domain: [
              "Counties incorporated in a Metropolitan Statistical Area",
              "Other counties",
              "US reference",
            ],
            range: ["hotpink", "LightSeaGreen", "black"],
          },
          strokeWidth: {
            dimension: "countyType",
            domain: [
              "Counties incorporated in a Metropolitan Statistical Area",
              "Other counties",
              "US reference",
            ],
            range: [1, 1, 2],
          },
        }}
        margins={{
          top: 20,
          right: 0,
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
        </ChartContainer>
        <LegendColor symbol="line" />
      </LineChart>
    </>
  );
};
