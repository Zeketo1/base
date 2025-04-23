import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import SideBar from "../common/SideBar";
import { useState } from "react";
import Analytics from "@/pages/Analytics";
import Customer from "@/pages/Customer";
import SignIn from "@/auth/SignIn";
import Signup from "@/auth/Signup";
import PageTransition from "@/utils/PageTransition";
import Invoice from "@/pages/Invoice";
import SSOCallback from "@/auth/SsoCallback";
import ProtectedRoute from "./ProtectedRoute";
import Schedule from "@/pages/Schedule";

const Layout = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="flex">
      <SideBar active={active} setActive={setActive} />
      <Outlet context={{ active, setActive }} />
    </div>
  );
};

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      // <ProtectedRoute>
        <Layout />
      // </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Home /> },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/customer",
        element: <Customer />,
      },
      {
        path: "/invoice",
        element: <Invoice />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: (
      <PageTransition>
        <SignIn />
      </PageTransition>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <PageTransition>
        <Signup />
      </PageTransition>
    ),
  },
  {
    path: "/sso-callback",
    element: <SSOCallback />,
  },
]);
