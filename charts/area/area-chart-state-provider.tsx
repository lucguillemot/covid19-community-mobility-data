import * as React from "react";
import { ReactNode } from "react";
import { Observer } from "../use-width";
import {
  AreaChartProps,
  AreaChartState,
  useAreaChartState,
} from "./area-chart-state";

type T = any;

export const ChartContext =
  React.createContext<AreaChartState<T> | undefined>(undefined);

export const useAreaChart = () => {
  const ctx = React.useContext(ChartContext);
  if (ctx === undefined) {
    throw Error(
      "You need to wrap your component in <AreaChartProvider /> to useChartState()"
    );
  }
  return ctx;
};

export function AreaChartProvider<T>({
  data,
  encoding,
  margins,
  aspectRatio,
  children,
}: AreaChartProps<T> & {
  children: ReactNode;
}) {
  const state = useAreaChartState<T>({
    data,
    encoding,
    margins,
    aspectRatio,
  });
  return (
    <ChartContext.Provider value={state}>{children}</ChartContext.Provider>
  );
}

export const AreaChart = ({
  data,
  encoding,
  margins,
  aspectRatio,
  children,
}: AreaChartProps<T> & {
  children: ReactNode;
}) => (
  <Observer>
    <AreaChartProvider
      data={data}
      encoding={encoding}
      margins={margins}
      aspectRatio={aspectRatio}
    >
      {children}
    </AreaChartProvider>
  </Observer>
);
