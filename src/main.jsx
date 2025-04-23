import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/style.css";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer className="z-[100]" />
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      // afterSignInUrl="/"
      // afterSignUpUrl="/"
      forceRedirectUrl="/"
      fallbackRedirectUrl="/"
      afterSignOutUrl="/sign-in"
      navigate={(to) => (window.location.href = to)}
    >
      <RouterProvider router={AppRouter} />
    </ClerkProvider>
  </StrictMode>
);
