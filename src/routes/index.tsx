import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import { ROUTES } from "../constants/routes";
import Database from "../pages/Database";
import Hardware from "../pages/Hardware";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Networks from "../pages/Networks";
import Software from "../pages/Software";

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("auth_token");
  return !!token && token !== "undefined" && token !== "null";
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  return !isAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTES.DASHBOARD} replace />
  );
};

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <Navigate
        to={isAuthenticated() ? ROUTES.DASHBOARD : ROUTES.LOGIN}
        replace
      />
    ),
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute>
        <Layout>
          <Home />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.HARDWARE,
    element: (
      <ProtectedRoute>
        <Layout>
          <Hardware />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.SOFTWARE,
    element: (
      <ProtectedRoute>
        <Layout>
          <Software />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.DATABASE,
    element: (
      <ProtectedRoute>
        <Layout>
          <Database />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.NETWORKS,
    element: (
      <ProtectedRoute>
        <Layout>
          <Networks />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.HOME} replace />,
  },
]);
