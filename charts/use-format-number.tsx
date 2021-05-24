import { format, NumberValue } from "d3";
import * as React from "react";

export const useFormatNumber = () => {
  const formatter = React.useMemo(() => {
    const formatter = format(",.2~f");
    return (x: NumberValue | null | undefined) => {
      if (x === null || x === undefined) {
        return "–";
      }
      return formatter(x);
    };
  }, []);
  return formatter;
};
export const useFormatPercent = () => {
  const formatter = React.useMemo(() => {
    const formatter = format(".0%");
    return (x: NumberValue | null | undefined) => {
      if (x === null || x === undefined) {
        return "–";
      }
      return formatter(+x / 100);
    };
  }, []);
  return formatter;
};
