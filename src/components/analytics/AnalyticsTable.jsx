import { analyticsTableData, analyticsTableHeader } from "@/utils/contants";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const AnalyticsTable = () => {
  return (
    <Table>
      <TableCaption className="hidden">Recent Orders</TableCaption>
      <TableHeader>
        <TableRow className="text-[12px]">
          {analyticsTableHeader.map((header, i) => (
            <TableHead key={i}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {analyticsTableData.map(
          ({ sn, image, name, price, totalOrder, totalSales, badge }, i) => (
            <TableRow className="text-[13px]" key={i}>
              <TableCell>
                {badge ? <img src={badge} alt={badge} /> : sn}
              </TableCell>
              <TableCell className="text-blue-500 flex items-center gap-3 text-[12px]">
                <img src={image} alt={name} className="h-[25px] object-cover" />
                {name}
              </TableCell>
              <TableCell>${price}</TableCell>
              <TableCell>{totalOrder} Pieces</TableCell>
              <TableCell className="text-green-500">${totalSales}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

export default AnalyticsTable;
