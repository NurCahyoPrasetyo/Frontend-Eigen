import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./AppRoutes";
import type { RouteItem } from "./types";

const renderRoute = <
  TProps extends Record<string, unknown> = Record<string, unknown>
>(
  route: RouteItem<TProps>
): React.ReactElement => {
  const {
    requireAuth = false,
    isLazy = false,
    props,
    index,
    path,
    key,
    name,
    routes: childrenRoutes,
    Component,
  } = route;

  const routeElement = requireAuth ? (
    <p>
      You need to be logged in to access this page.
      <br />
    </p>
  ) : (
    <Component {...(props as TProps)} />
  );

  const routeComponent = isLazy ? (
    <Suspense fallback={<p>Loading ...</p>}>{routeElement}</Suspense>
  ) : (
    routeElement
  );

  const children = childrenRoutes?.map((child) => renderRoute(child));

  if (index) {
    return <Route key={key || name} index element={routeComponent} />;
  }

  return (
    <Route key={key || name} path={path} element={routeComponent}>
      {children}
    </Route>
  );
};

const Pages: React.FC = () => {
  return <Routes>{routes.map((route) => renderRoute(route))}</Routes>;
};

export default Pages;
