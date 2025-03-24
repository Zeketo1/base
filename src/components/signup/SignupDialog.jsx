import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignupOTP } from "./SignupOTP";

export function SignupDialog({ children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden">Edit profile</DialogTitle>
          <DialogDescription>
            <SignupOTP />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="hidden"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

SignupDialog.propTypes = {
  children: PropTypes.element,
};
