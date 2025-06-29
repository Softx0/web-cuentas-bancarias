import React from "react";
import { RouteConfig } from "../types/route.types";

// Lazy loading para páginas del dashboard
const Dashboard = React.lazy(() => import("../../pages/Dashboard/Dashboard"));

export const dashboardRoutes: RouteConfig[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    isProtected: true,
    inactivityTimeout: 10000, // 20 segundos
    meta: {
      title: "Dashboard Principal",
      description: "Panel principal de la aplicación",
      requiresAuth: true,
    },
  },
];
