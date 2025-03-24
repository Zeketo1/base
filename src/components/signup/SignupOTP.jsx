import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";

export function SignupOTP() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useSignUp();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      if (!signUp) return;

      await signUp.attemptEmailAddressVerification({ code });
      window.location.href = "/"; // Or your success redirect
    } catch (err) {
      setError(err.errors[0].longMessage || "Invalid verification code");
    }
  };

  return (
    <form
      onSubmit={handleVerify}
      className="flex flex-col gap-5 items-center p-6"
    >
        <h1 className="text-center">Enter OTP Code</h1>
      <InputOTP maxLength={6} value={code} onChange={setCode}>
        <InputOTPGroup>
          {Array.from({ length: 6 }).map((_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="cursor-pointer text-center text-white text-[14px] bg-primary1 w-full px-3 py-2 border rounded-md hover:bg-primary1-dark disabled:opacity-50"
      >
        Verify
      </button>
    </form>
  );
}
