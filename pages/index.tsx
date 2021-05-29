import * as CKA from "@chakra-ui/react";
import * as React from "react";
import { ChartFigure, ChartTitle } from "../components/chart-meta";
import { MSAChart } from "../components/msa-chart";
import { Paragraph } from "../components/paragraph";
import { USRecreationplaceChart } from "../components/us-recreation-chart";
import { USWorkplaceChart } from "../components/us-workplaces-chart";

export default function Home() {
  return (
    <CKA.Box sx={{ maxWidth: "44rem", mx: "auto", px: 4 }}>
      <CKA.Heading as="h1" sx={{ fontWeight: 500, mt: 28, fontSize: 42 }}>
        Metropolitan Americans are not returning to their workplaces.
      </CKA.Heading>
      <Paragraph sx={{ fontWeight: 600, mt: 4 }}>
        Despite increasing vaccination rates, Americans are not frequenting
        places of work as much as they used to before the pandemic, according to
        new Community Mobility data published by Google. And the phenomenon is
        starker in metropolitan areas.
      </Paragraph>
      <Paragraph>
        Nationwide, the level of Americans visiting places of work has not
        returned to pre-pandemic level. Google provides{" "}
        <CKA.Link
          sx={{ textDecoration: "underline" }}
          href="https://support.google.com/covid19-mobility#topic=9822927"
        >
          reports on mobility data
        </CKA.Link>{" "}
        to track difference of frequentation in places of work compared to a
        pre-pandemic baseline.
      </Paragraph>

      <ChartFigure>
        <USWorkplaceChart />
        <ChartTitle
          title="Mobility Trends for places of work"
          description={
            <>
              Mobility Trends for places of work in the United States, 7-day
              rolling average of percentage difference to the zero baseline.
              <br />
              Feb 15, 2020 to May 9th, 2021.
              <br />
              The baseline is calculated as the median frequentation of places
              of work for each weekday between Jan 3 and Feb 6, 2020.
            </>
          }
        />
      </ChartFigure>

      <Paragraph>
        During spring 2020, lockdowns and shelter-in-place policies explain the
        sudden drop of frequentation, to almost -50%. National holidays like
        Thanksgiving or Christmas can also be clearly identified: as expected,
        less people go to work during these holidays. Early 2021, President Day
        and Easter weekends explains the temporary reduction of frequentation.
      </Paragraph>
      <Paragraph>
        Covid-19 vaccines have been rolled out since December 2019—close to 50%
        of the US population is now vaccinated— and job creation numbers are on
        the rise again. Despite these numbers, the level of frequentation of
        places of work today is still 20% below what it was beginning of 2020.
      </Paragraph>

      <CKA.Heading
        as="h2"
        sx={{
          fontWeight: 600,
          mt: 28,
          fontSize: 26,
          fontFamily: "body",
        }}
      >
        Work mobility is trailing leisure mobility
      </CKA.Heading>
      <Paragraph>
        By contrast, mobility to places like restaurants, cafes, shopping
        centers, theme parks, museums, libraries, and movie theaters is
        increasing, especially since the end of February 2021, to reach only 5%
        below baseline mid-May. This contrast confirms that work mobility is
        trailing other types of mobility, and might indicate lasting effects of
        the pandemic on work habits.
      </Paragraph>

      <ChartFigure>
        <USRecreationplaceChart />
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
      </ChartFigure>

      <CKA.Heading
        as="h2"
        sx={{
          fontWeight: 600,
          mt: 28,
          fontSize: 26,
          fontFamily: "body",
        }}
      >
        Work mobility in metropolitan areas isn't picking up like work mobility
        in non-metropolitan areas.
      </CKA.Heading>

      <Paragraph>
        The discrepancy between work and leisure mobility is starker in
        metropolitan counties. In most states, the median value of work mobility
        for counties incorporated in metropolitan areas is lower than the median
        value for counties that are not incorporated, or are part of a
        micropolitan area.
      </Paragraph>

      <ChartFigure>
        <MSAChart />
        <ChartTitle
          title=""
          description={
            <>
              Mobility Trends in 2021, by county type. <br />
              For each county type, the lines represent the median value of the
              7-day rolling average percentage difference to the baseline.
            </>
          }
        />
      </ChartFigure>

      <Paragraph sx={{ mb: 60 }}>
        This difference can be explained by the concentration in cities of
        knowledge workers, who often have a choice to work from home. Most
        technology companies announced for example that they would allow their
        employees to work remotely on a permanent basis, or have organized
        hybrid approaches where employees can split their time between the
        office and their home. These announcements might be a sign that this
        trend is likely to stay.
      </Paragraph>
    </CKA.Box>
  );
}
