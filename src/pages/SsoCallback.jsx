import { useClerk } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    handleRedirectCallback({
      redirectUrl: "/",
      afterSignInUrl: "/",
      afterSignUpUrl: "/",
    });
  }, [handleRedirectCallback]);

  return <div>Loading...</div>;
}