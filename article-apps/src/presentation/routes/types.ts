import type { ComponentType, ReactNode } from "react";

export interface RouteItem<TProps = Record<string, unknown>> {
  key: string;
  name: string;
  path: string;
  Component: ComponentType<TProps> | ReactNode; // Bisa jadi komponen atau elemen React
  index?: true;
  requireAuth?: boolean;
  isLazy?: boolean;
  props?: TProps;
  routes?: RouteItem[]; // Bisa ditingkatkan juga jadi generik
}
