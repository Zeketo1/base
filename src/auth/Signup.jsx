import { Link } from "react-router-dom";
import signupImg from "../assets/auth/signup.svg";
import logo from "../assets/Logo.svg";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebookF } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useSignUp,
  // useClerk
} from "@clerk/clerk-react";
import { useState } from "react";
import { SignupDialog } from "@/components/signup/SignupDialog";

const Signup = () => {
  const { signUp, isLoaded } = useSignUp();
  // const { handleRedirectCallback } = useClerk();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const form = e.target.form;
    const allRequiredFilled = Array.from(form.elements)
      .filter((el) => el.required)
      .every((el) => {
        if (el.type === "checkbox") return el.checked;
        return el.value.trim() !== "";
      });

    setIsFormValid(allRequiredFilled);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password,
        username,
        firstName: firstName,
        lastName: lastName,
      });

      // // Send verification email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Redirect to verification page
      // window.location.href = "/login";
    } catch (err) {
      setError(err.errors[0].message);
      setLoading(false);
    }
  };

  // const handleSocialLogin = (strategy) => {
  //   if (!isLoaded) return;

  //   // For sign-in component
  //   return signUp.authenticateWithRedirect({
  //     strategy,
  //     redirectUrl: "/sso-callback",
  //     redirectUrlComplete: "/",
  //   });
  // };

  return (
    <div className="h-screen grid grid-cols-[30%_70%] !overflow-hidden">
      <div className="h-full sheet__scrollbar overflow-y-scroll">
        <div className="h-fit flex flex-col gap-5 items-center justify-center bg-white p-10">
          <img className="h-[60px]" src={logo} alt="Logo" />
          <h1 className="text-lg font-semibold">Sign up</h1>

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

          <form
            onSubmit={handleSubmit}
            onChange={handleChange}
            className="flex flex-col gap-4 w-full"
          >
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[14px]">First Name</label>
                <input
                  className="w-full px-3 py-2 border rounded-md placeholder:text-[13px]"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px]">Last Name</label>
                <input
                  className="w-full px-3 py-2 border rounded-md placeholder:text-[13px]"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
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
              <label className="text-[14px]">Username</label>
              <input
                className="w-full px-3 py-2 border rounded-md placeholder:text-[13px]"
                type="text"
                placeholder="johndoe23"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <div className="flex items-start gap-1 my-2">
              <Checkbox className="translate-y-[2px]" required />
              <p className="text-sm">
                By creating an account you agree to the{" "}
                <span className="text-primary1 underline">terms of use</span>{" "}
                and our
                <span className="text-primary1 underline"> privacy policy</span>
                .
              </p>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className="cursor-pointer text-center text-white text-[14px] bg-primary1 w-full px-3 py-2 border rounded-md hover:bg-primary1-dark disabled:opacity-50"
            >
              <SignupDialog>
                <div>{loading ? "Creating Account..." : "Create Account"}</div>
              </SignupDialog>
            </button>
          </form>

          <Link to="/sign-in" className="text-sm">
            Already have an account?
            <span className="text-primary1"> Sign in</span>
          </Link>
        </div>
      </div>
      <div className="h-full flex justify-center items-center">
        <img className="h-[400px]" src={signupImg} alt="Login Image" />
      </div>
      <div id="clerk-captcha" />
    </div>
  );
};

export default Signup;
