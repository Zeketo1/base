import loginImg from "../assets/auth/login.svg";
import logo from "../assets/Logo.svg";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebookF } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import {
  useSignIn,
  // SignedOut,
  useUser,
  // SignedIn,
  // useClerk,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const SignIn = () => {
  const { signIn, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user } = useUser();
  // const { signOut } = useClerk();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLoaded) return;

    try {
      await signIn.create({
        identifier: email,
        password,
      });
      window.location.href = "/";
    } catch (err) {
      setError(err.errors[0].message);
    }
  };

  // const handleSocialLogin = (strategy) => {
  //   if (!isLoaded) return;

  //   return signIn.authenticateWithRedirect({
  //     strategy,
  //     redirectUrl: "/sso-callback",
  //     redirectUrlComplete: "/",
  //   });
  // };
  
  useEffect(() => {
    console.log(user);
  }, [user]);

  // const handleSignOut = async () => {
  //   if (!isLoaded || !user) return;

  //   try {
  //     await signOut();
  //     // Optional: Redirect after sign out
  //     window.location.href = "/sign-in";
  //   } catch (err) {
  //     console.error("Error during sign out:", err);
  //   }
  // };

  return (
    <div className="grid grid-cols-[30%_70%]">
      <div className="flex flex-col gap-5 items-center justify-center bg-white p-10">
        <img className="h-[60px]" src={logo} alt="Logo" />
        <h1 className="text-lg font-semibold">Sign In</h1>

        {/* Social Login Buttons */}
        {/* <div className="grid grid-cols-2 gap-5 w-full">
          <button
            onClick={() => handleSocialLogin("oauth_google")}
            className="flex justify-center rounded-md items-center gap-1 shadow-md py-2 bg-[#fafafb] hover:bg-gray-50"
          >
            <FcGoogle className="text-[20px]" />
            <p className="text-sm text-gray-600">Google</p>
          </button>
          <button
            onClick={() => handleSocialLogin("oauth_facebook")}
            className="flex justify-center rounded-md items-center gap-1 shadow-md py-2 bg-[#fafafb] hover:bg-gray-50"
          >
            <FaFacebookF className="text-[20px] text-blue-500" />
            <p className="text-sm text-gray-600">Facebook</p>
          </button>
        </div>

        <div className="flex gap-3 items-center w-full">
          <div className="h-[2px] w-full bg-gray-300"></div>
          <p className="text-sm italic">Or</p>
          <div className="h-[2px] w-full bg-gray-300"></div>
        </div> */}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-[14px]">Email Address</label>
            <input
              className="w-full px-3 py-2 border rounded-md placeholder:text-[13px]"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[14px]">Password</label>
            <input
              className="w-full px-3 py-2 border rounded-md placeholder:text-[13px]"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox />
              <p className="text-sm">Remember me</p>
            </div>
            <Link to="/reset-password" className="text-sm text-primary1">
              Reset Password?
            </Link>
          </div>

          {/* <SignedOut> */}
            <button
              type="submit"
              className="cursor-pointer text-center text-white text-[14px] bg-primary1 w-full px-3 py-2 border rounded-md hover:bg-primary1-dark"
            >
              Log In
            </button>
          {/* </SignedOut> */}
          {/* <SignedIn>
            <button
              onClick={handleSignOut}
              className="cursor-pointer text-center text-white text-[14px] bg-primary1 w-full px-3 py-2 border rounded-md hover:bg-primary1-dark"
            >
              Sign Out
            </button>
          </SignedIn> */}
        </form>

        <p className="text-sm">
          Don’t have account yet?{" "}
          <Link to="/sign-up" className="text-primary1">
            New Account
          </Link>
        </p>
      </div>

      <div className="h-screen flex justify-center items-center">
        <img className="h-[500px]" src={loginImg} alt="Login Image" />
      </div>
      <div id='clerk-captcha' />
    </div>
  );
};

export default SignIn;
