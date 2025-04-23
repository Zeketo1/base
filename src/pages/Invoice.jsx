import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import InvoiceTable from "@/components/invoice/InvoiceTable";
import axios from "axios";
import InvoiceDialogAdd from "@/components/invoice/InvoiceDialogAdd";

const Invoice = () => {
  const { setActive } = useOutletContext();
  const [invoiceTableData, setInvoiceTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3300/invoice");
      const sortedData = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setInvoiceTableData(sortedData);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Fetch data only once when the component mounts
  useEffect(() => {
    fetchCustomers();
  }, []);

  // const invoiceStatusUpdate = filteredData.map((invoice) => ({
  //   ...invoice,
  //   status: "pending",
  // }));

  useEffect(() => {
    setActive(false);
  }, [setActive]);

  useEffect(() => {
    const filteredDataEffect = invoiceTableData.filter((data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredDataEffect);
  }, [searchTerm, invoiceTableData]);

  return (
    <div className="flex-1 flex flex-col gap-7 py-4 pr-7 w-full">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-[20px]">Invoice</p>
        <div className="flex gap-4 items-center">
          <div className="flex shadow-md rounded-md bg-white px-2 items-center gap-2">
            <input
              className="py-2 rounded-md outline-none placeholder:text-[13px] text-[13px]"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IoIosSearch className="text-[18px]" />
          </div>
          <InvoiceDialogAdd>
            <div className="py-2 px-4 bg-primary1 text-[13px] text-white rounded-md">
              + Add New
            </div>
          </InvoiceDialogAdd>
          <InvoiceDialogAdd>
            <div className="py-2 px-4 bg-primary1 text-[13px] text-white rounded-md">
              + Add New
            </div>
          </InvoiceDialogAdd>
        </div>
      </div>
      <div className="relative w-full overflow-auto px-5 py-3 bg-white shadow-md rounded-lg">
        <InvoiceTable filteredData={filteredData} />
      </div>
    </div>
  );
};

export default Invoice;
