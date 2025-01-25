import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import SideBar from "../common/SideBar";
import { useState } from "react";
import Analytics from "@/pages/Analytics";
import Customer from "@/pages/Customer";

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
      { path: "dashboard", element: <Home /> },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/customer",
        element: <Customer />,
      },
    ],
  },
]);
