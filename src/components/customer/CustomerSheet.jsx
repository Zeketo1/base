import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import PropTypes from "prop-types";

const CustomerSheet = ({ children, elementStyles }) => {
  return (
    <Sheet className="sheet__scrollbar">
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="sheet__scrollbar overflow-y-scroll" side="right">
        <SheetHeader>
          <SheetTitle className="hidden">Are you absolutely sure?</SheetTitle>
          <SheetDescription>{elementStyles()}</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

CustomerSheet.propTypes = {
  children: PropTypes.element.isRequired,
  elementStyles: PropTypes.func.isRequired,
};

export default CustomerSheet;
