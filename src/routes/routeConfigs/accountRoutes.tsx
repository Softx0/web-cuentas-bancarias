import React from "react";
import { RouteConfig } from "../types/route.types";

// Lazy loading para páginas del banking
const Accounts = React.lazy(() => import("../../pages/Accounts/Accounts"));
const AccountDetail = React.lazy(
  () => import("../../pages/AccountDetail/AccountDetail")
);
const Transfer = React.lazy(() => import("../../pages/Transfer/Transfer"));

export const accountRoutes: RouteConfig[] = [
  {
    path: "/accounts",
    element: <Accounts />,
    isProtected: true,
    inactivityTimeout: 600000, // 10 minutos
    meta: {
      title: "Mis Cuentas",
      description: "Listado de cuentas bancarias",
      requiresAuth: true,
    },
  },
  {
    path: "/account/:accountId",
    element: <AccountDetail />,
    isProtected: true,
    inactivityTimeout: 600000,
    meta: {
      title: "Detalle de Cuenta",
      description: "Información detallada de la cuenta",
      requiresAuth: true,
    },
  },
  {
    path: "/transfer",
    element: <Transfer />,
    isProtected: true,
    inactivityTimeout: 300000, // 5 minutos para transferencias
    meta: {
      title: "Transferir Dinero",
      description: "Realizar transferencias entre cuentas",
      requiresAuth: true,
    },
  },
];
