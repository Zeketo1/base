import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PropTypes from "prop-types";

const InvoiceSheet = ({ children, elementStyles }) => {
  return (
    <Dialog className="w-full">
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-[80%]">
        <DialogHeader>
          <DialogTitle className="hidden">Are you absolutely sure?</DialogTitle>
          <DialogDescription>{elementStyles()}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

InvoiceSheet.propTypes = {
  children: PropTypes.element.isRequired,
  elementStyles: PropTypes.func.isRequired,
};

export default InvoiceSheet;
