import loginImg from "../assets/auth/login.svg";
import logo from "../assets/Logo.svg";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebookF } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="grid grid-cols-[30%_70%]">
      <div className="flex flex-col gap-5 items-center justify-center bg-white p-10">
        <img className="h-[60px]" src={logo} alt="Logo" />
        <h1 className="text-lg font-semibold">Log In</h1>
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
            <label className="text-[14px]">Email Address</label>
            <input
              className="w-full px-3 py-2 border rounded-md placeholder:text-[13px]"
              type="email"
              placeholder="example@gmail.com"
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox />
              <p className="text-sm">Remember me</p>
            </div>
            <p className="text-sm text-primary1">Reset Password?</p>
          </div>
          <div className="cursor-pointer text-center text-white text-[14px] bg-primary1 w-full px-3 py-2 border rounded-md">
            Log In
          </div>
        </form>
        <p className="text-sm">
          Don’t have account yet?{" "}
          <Link to="/signup" className="text-primary1">New Account</Link>
        </p>
      </div>
      <div type="submit" className="h-screen flex justify-center items-center">
        <img className="h-[500px]" src={loginImg} alt="Login Image" />
      </div>
    </div>
  );
};

export default Login;
