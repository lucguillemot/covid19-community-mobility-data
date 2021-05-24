import * as CKA from "@chakra-ui/react";
import * as React from "react";
import { MSAChart } from "../components/msa-chart";
import { Paragraph } from "../components/paragraph";
import { USChart } from "../components/us-chart";

export default function Home() {
  return (
    <CKA.Box sx={{ maxWidth: "44rem", mx: "auto", px: 8 }}>
      <CKA.Heading
        as="h1"
        sx={{ fontWeight: 400, mt: 28, textAlign: "left", fontSize: 42 }}
      >
        Americans are not massively returning to their workplaces
      </CKA.Heading>
      <Paragraph sx={{ fontWeight: 600, mt: 4 }}>
        Despite rising numbers of vaccinated people, Americans are not
        frequenting places of work as much as they used to before the pandemic,
        according to new Community Mobility data published by Google. And the
        phenomenon is starker in metropolitan areas.
      </Paragraph>
      <Paragraph>
        Nationwide, the level of Americans working from places of work has not
        returned to pre-pandemic level. Google uses{" "}
        <a href="https://support.google.com/covid19-mobility#topic=9822927">
          location data from their users
        </a>{" "}
        to track difference of frequentation in places of work compared to a
        baseline (zero on the chart below). The baseline is calculated as the
        median frequentation of places of work for each weekday between Jan 3
        and Feb 6, 2020.
      </Paragraph>

      <USChart />

      <Paragraph>
        During spring 2020, lockdowns and shelter-in-place policies were
        implemented, which explains the sudden drop of frequentation, to almost
        -50%, starting end of March 2020. Other sudden drops can be explained by
        national holidays (Thanksgiving, Christmas, etc.).
      </Paragraph>
      <Paragraph>
        Covid-19 vaccines have been rolled out since December 2019. Close to 50%
        of the US population is now vaccinated. Despite these numbers, the level
        of frequentation of places of work today is still 20% below what it was
        beginning of 2020, which might indicates lasting effects of the pandemic
        on work habits.
      </Paragraph>
      <Paragraph>
        This phenomenon is stronger in metropolitan areas than in rural areas.
        In most states, the median value for counties incorporated in
        metropolitan areas is lower than the median value for counties that are
        not incorporated, or are part of a micropolitan area.
      </Paragraph>

      <MSAChart />

      <Paragraph sx={{ mb: 60 }}>
        In the first months of 2021, the 2 drops mid-february and early April
        corresponds to President Day and Easter weekends. The difference between
        cities and rural areas could be explained by the fact that working from
        home is easier for hughly skilled jobs, which are most present in
        cities.
      </Paragraph>
    </CKA.Box>
  );
}
