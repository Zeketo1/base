import signupImg from "../assets/auth/signup.svg";
import logo from "../assets/Logo.svg";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebookF } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
const Signup = () => {
  return (
    <div className="h-screen grid grid-cols-[30%_70%]">
      <div className="h-full sheet__scrollbar overflow-y-scroll">
        <div className="h-fit flex flex-col gap-5 items-center justify-center bg-white p-10">
          <img className="h-[60px]" src={logo} alt="Logo" />
          <h1 className="text-lg font-semibold">Sign up</h1>
          {/* <div className="grid grid-cols-2 gap-5 w-full">
            <div className="flex justify-center rounded-md items-center gap-1 shadow-md py-2 bg-[#fafafb]">
              <FcGoogle className="text-[20px]" />
              <p className="text-sm text-gray-600">Google</p>
            </div>
            <div className="flex justify-center rounded-md items-center gap-1 shadow-md py-2 bg-[#fafafb]">
              <FaFacebookF className="text-[20px] text-blue-500" />
              <p className="text-sm text-gray-600">Facebook</p>
            </div>
          </div>
          <div className="flex gap-3 items-center w-full">
            <div className="h-[2px] w-full bg-gray-300"></div>
            <p className="text-sm italic">Or</p>
            <div className="h-[2px] w-full bg-gray-300"></div>
          </div> */}
          <form className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-[14px]">Full Name</label>
              <input
                className="w-full px-3 py-2 border rounded-md placeholder:text-[13px]"
                type="email"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px]">Email Address</label>
              <input
                className="w-full px-3 py-2 border rounded-md placeholder:text-[13px]"
                type="email"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px]">Username</label>
              <input
                className="w-full px-3 py-2 border rounded-md placeholder:text-[13px]"
                type="email"
                placeholder="johndoe23"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px]">Password</label>
              <input
                className="w-full px-3 py-2 border rounded-md placeholder:text-[13px]"
                type="password"
                placeholder="••••••••••••"
              />
            </div>
            <div className="flex items-start gap-1 my-2">
              <Checkbox className="translate-y-[2px]" />
              <p className="text-sm">
                By creating an account you agree to the{" "}
                <span className="text-primary1 underline">terms of use</span>{" "}
                and our
                <span className="text-primary1 underline"> privacy policy</span>
                .
              </p>
            </div>
            <div className="cursor-pointer text-center text-white text-[14px] bg-primary1 w-full px-3 py-2 border rounded-md">
              Create account
            </div>
          </form>
          <p className="text-sm">
            Already have an account?
            <span className="text-primary1"> Log in</span>
          </p>
        </div>
      </div>
      <div type="submit" className="h-screen flex justify-center items-center">
        <img className="h-[400px]" src={signupImg} alt="Login Image" />
      </div>
    </div>
  );
};

export default Signup;
