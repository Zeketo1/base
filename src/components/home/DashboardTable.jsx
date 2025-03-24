import { tableContent, tableHeaders } from "@/utils/contants";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const DashboardTable = () => {
  return (
    <Table>
      <TableCaption className="hidden">Recent Orders</TableCaption>
      <TableHeader>
        <TableRow className="text-[12px]">
          {tableHeaders.map((header, i) => (
            <TableHead key={i}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableContent.map(({ name, price, quntity, tracking, image }, i) => (
          <TableRow className="text-[13px]" key={i}>
            <TableCell>{tracking}</TableCell>
            <TableCell className="flex items-center gap-3 text-[12px]"><img src={image} alt={name} className="h-[25px] object-cover" />{name}</TableCell>
            <TableCell>${price}</TableCell>
            <TableCell>{quntity}</TableCell>
            <TableCell>${price * quntity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardTable;
