import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import SideBar from "../common/SideBar";
import { useState } from "react";
import Analytics from "@/pages/Analytics";
import Customer from "@/pages/Customer";
import Login from "@/auth/Login";
import Signup from "@/auth/Signup";
import PageTransition from "@/utils/PageTransition";
import Invoice from "@/pages/Invoice";

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
    element: <Layout />,
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
    ],
  },
  {
    path: "/login",
    element: (
      <PageTransition>
        <Login />
      </PageTransition>
    ),
  },
  {
    path: "/signup",
    element: (
      <PageTransition>
        <Signup />
      </PageTransition>
    ),
  },
]);
