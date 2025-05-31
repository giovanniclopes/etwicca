export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  HARDWARE: "/hardware",
  SOFTWARE: "/software",
  DATABASE: "/database",
  NETWORKS: "/networks",
} as const;

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.HARDWARE,
  ROUTES.SOFTWARE,
  ROUTES.DATABASE,
  ROUTES.NETWORKS,
] as const;

export const PUBLIC_ROUTES = [ROUTES.LOGIN] as const;

export type RouteType = (typeof ROUTES)[keyof typeof ROUTES];
