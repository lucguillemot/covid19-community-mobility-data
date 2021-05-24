import * as React from "react";
import { ReactNode } from "react";
import { InteractionProvider } from "../use-interaction";
import { Observer } from "../use-width";
import {
  LineChartProps,
  LineChartState,
  useLineChartState,
} from "./line-chart-state";

type T = any;

export const ChartContext =
  React.createContext<LineChartState<T> | undefined>(undefined);

export const useLineChart = () => {
  const ctx = React.useContext(ChartContext);
  if (ctx === undefined) {
    throw Error(
      "You need to wrap your component in <LineChartProvider /> to useChartState()"
    );
  }
  return ctx;
};

export function LineChartProvider<T>({
  data,
  encoding,
  margins,
  aspectRatio,
  children,
}: LineChartProps<T> & {
  children: ReactNode;
}) {
  const state = useLineChartState<T>({
    data,
    encoding,
    margins,
    aspectRatio,
  });
  return (
    <ChartContext.Provider value={state}>{children}</ChartContext.Provider>
  );
}

export const LineChart = ({
  data,
  encoding,
  margins,
  aspectRatio,
  children,
}: LineChartProps<T> & {
  children: ReactNode;
}) => (
  <Observer>
    <InteractionProvider>
      <LineChartProvider
        data={data}
        encoding={encoding}
        margins={margins}
        aspectRatio={aspectRatio}
      >
        {children}
      </LineChartProvider>
    </InteractionProvider>
  </Observer>
);
