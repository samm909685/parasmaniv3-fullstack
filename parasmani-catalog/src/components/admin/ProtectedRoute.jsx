import { useEffect, useState } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api.parasmanijewelers.in";

function ProtectedRoute() {
  const location = useLocation();

  const [checkingAuth, setCheckingAuth] =
    useState(true);

  const [authenticated, setAuthenticated] =
    useState(false);

  useEffect(() => {
    const verifyAuthentication = async () => {
      const token = localStorage.getItem(
        "parasmani_admin_token"
      );

      /* No token = definitely not logged in */

      if (!token) {
        setAuthenticated(false);
        setCheckingAuth(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/auth/me`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        /* Token is invalid / expired */

        if (
          !response.ok ||
          !data.success
        ) {
          localStorage.removeItem(
            "parasmani_admin_token"
          );

          localStorage.removeItem(
            "parasmani_admin"
          );

          setAuthenticated(false);
          setCheckingAuth(false);

          return;
        }

        /* Token is valid */

        if (data.admin) {
          localStorage.setItem(
            "parasmani_admin",
            JSON.stringify(data.admin)
          );
        }

        setAuthenticated(true);
        setCheckingAuth(false);

      } catch (error) {
        console.error(
          "Authentication verification failed:",
          error
        );

        localStorage.removeItem(
          "parasmani_admin_token"
        );

        localStorage.removeItem(
          "parasmani_admin"
        );

        setAuthenticated(false);
        setCheckingAuth(false);
      }
    };

    verifyAuthentication();
  }, []);

  /*
    While checking the JWT,
    don't redirect or show the dashboard.
  */

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center">
        <div className="text-center">

          <div
            className="
              w-10
              h-10
              border-4
              border-[#18322F]/20
              border-t-[#18322F]
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="mt-4 text-[#18322F] font-medium">
            Checking authentication...
          </p>

        </div>
      </div>
    );
  }

  /*
    No valid authentication
    → send user to login.
  */

  if (!authenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  /*
    Valid authentication
    → allow protected route.
  */

  return <Outlet />;
}

export default ProtectedRoute;