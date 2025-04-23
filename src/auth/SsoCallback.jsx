// ssoCallback.jsx
import { useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SSOCallback = () => {
  const { handleRedirectCallback } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        if (typeof handleRedirectCallback === "function") {
          const result = await handleRedirectCallback({
            afterSignInUrl: "/",
            afterSignUpUrl: "/",
            redirectUrl: "/",
            continueSignUpUrl: "/",
          });

          console.log(result);

          // if (result.status === "complete") {
          //   navigate(result.createdSessionId ? "/" : "/sign-up");
          // }
        }
      } catch (error) {
        console.error("SSO callback error:", error);
        navigate("/sign-in");
      }
    };

    handleCallback();
  }, [handleRedirectCallback, navigate]);

  return <div>Loading...</div>;
};

export default SSOCallback;
