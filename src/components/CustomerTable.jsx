import { custermerTableHeader, customerData } from "@/utils/contants";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const CustomerTable = () => {
  return (
    <Table>
      <TableCaption className="hidden">Recent Orders</TableCaption>
      <TableHeader>
        <TableRow className="text-[12px]">
          {custermerTableHeader.map((header, i) => (
            <TableHead key={i} className={`${i === custermerTableHeader.length - 1 && "opacity-0"}`}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {customerData.map(({ name, image, email, phone, gender }, i) => (
          <TableRow className="text-[13px]" key={i}>
            <TableCell className="flex items-center gap-3 text-[12px]">
              <img src={image} alt={name} className="h-[30px] w-[30px] object-cover rounded-full" />
              {name}
            </TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{gender}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomerTable;
