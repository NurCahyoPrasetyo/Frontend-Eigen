import type { RouteItem } from "./types";

import AppLayout from "../components/layout/AppLayout";
import DetailPage from "../pages/DetailPage";
import NewsListPage from "../pages/NewsListPage";

const routes: RouteItem<{ children: React.ReactNode }>[] = [
  {
    name: "main",
    path: "/",
    Component: AppLayout,
    key: "main",
    routes: [
      {
        key: "home",
        name: "home",
        path: "/",
        index: true,
        requireAuth: false,
        Component: NewsListPage,
      },
      {
        key: "detail",
        name: "detail",
        path: "detail/:id",
        Component: DetailPage,
      },
      {
        name: "404",
        path: "*",
        Component: () => (
          <div>
            <h1>404</h1>
            <p>PAGE NOT FOUND</p>
          </div>
        ),
        key: "404",
      },
    ],
  },
];

export default routes;
