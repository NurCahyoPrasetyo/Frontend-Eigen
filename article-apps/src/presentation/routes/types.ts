import type { ComponentType } from "react";

export interface RouteItem<TProps = Record<string, unknown>> {
  key: string;
  name: string;
  path: string;
  Component: ComponentType<TProps>;
  index?: true;
  requireAuth?: boolean;
  isLazy?: boolean;
  props?: TProps;
  routes?: RouteItem[];
}
