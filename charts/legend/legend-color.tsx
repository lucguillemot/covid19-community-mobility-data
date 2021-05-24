import * as CKA from "@chakra-ui/react";
import React, { memo } from "react";
import { useLineChart } from "../line/line-chart-state-provider";
import { useChartTheme } from "../use-chart-theme";

type LegendSymbol = "square" | "line" | "circle";

export const LegendColor = memo(({ symbol }: { symbol: LegendSymbol }) => {
  const { colorScale } = useLineChart();
  return (
    <CKA.Flex
      sx={{
        position: "relative",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "wrap",
        minHeight: "20px",
      }}
    >
      {colorScale.domain().map((item, i) => (
        <LegendItem
          key={i}
          item={item}
          color={colorScale(item)}
          symbol={symbol}
        />
      ))}
    </CKA.Flex>
  );
});

export const LegendItem = ({
  item,
  color,
  symbol,
}: {
  item: string;
  color: string;
  symbol: LegendSymbol;
}) => {
  const { legendFontSize } = useChartTheme();
  return (
    <CKA.Flex
      sx={{
        position: "relative",
        mt: 1,
        mr: 4,
        justifyContent: "flex-start",
        alignItems: "center",
        pl: 2,
        fontFamily: "body",
        lineHeight: [1, 2, 2],
        fontWeight: "regular",
        fontSize: legendFontSize,
        color: "monochrome700",

        "&::before": {
          content: "''",
          position: "relative",
          display: "block",
          left: -2,
          width: "1rem",
          height: symbol === "square" || symbol === "circle" ? `1rem` : 1,
          borderRadius: symbol === "circle" ? "50%" : 0,
          bg: color,
        },
      }}
    >
      {item}
    </CKA.Flex>
  );
};
