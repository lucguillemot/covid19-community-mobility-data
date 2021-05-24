import { useTheme } from "@chakra-ui/react";

export const useChartTheme = () => {
  const theme = useTheme();
  const labelColor = theme.colors.gray["800"];
  const legendLabelColor = theme.colors.gray["700"];
  const legendFontSize = 14;
  const domainColor = theme.colors.gray["800"];
  const gridColor = theme.colors.gray["300"];
  const labelFontSize = 12;
  const fontFamily = theme.fonts.body;
  const axisLabelFontSize = 14;
  const axisLabelFontWeight = 500;
  const axisLabelColor = theme.colors.gray["800"];
  const markBorderColor = theme.colors.gray["100"];
  const brushOverlayColor = theme.colors.gray["300"];
  const brushSelectionColor = theme.colors.gray["600"];
  const brushHandleStrokeColor = theme.colors.gray["600"];
  const brushHandleFillColor = theme.colors.gray["100"];

  return {
    axisLabelFontSize,
    axisLabelColor,
    axisLabelFontWeight,
    labelColor,
    labelFontSize,
    legendFontSize,
    domainColor,
    gridColor,
    legendLabelColor,
    fontFamily,
    markBorderColor,
    brushOverlayColor,
    brushSelectionColor,
    brushHandleStrokeColor,
    brushHandleFillColor,
  };
};
