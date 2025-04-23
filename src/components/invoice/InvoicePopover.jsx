import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import PropTypes from "prop-types";
import { CiEdit } from "react-icons/ci";
import { MdCancel, MdDelete } from "react-icons/md";
import TableAlertDialog from "../TableAlertDialog";
import CustomerSheet from "../customer/CustomerSheet";
import { IoIosCamera } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";
import { showToast } from "@/utils/contants";
import logo from "/Logo.svg";
import { FaRegEye } from "react-icons/fa";
import { SheetClose } from "../ui/sheet";
import axios from "axios";
import InvoiceDialog from "./InvoiceDialog";
import { useDropzone } from "react-dropzone";
import { GoPlus } from "react-icons/go";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Loader from "../Loader";
import { format } from "date-fns";
import { addOneMonth } from "@/utils/contants";
import { BiDownload } from "react-icons/bi";
import { usePDF } from "react-to-pdf";

const InvoicePopover = ({ children, invoiceData }) => {
  const [name, setName] = useState(invoiceData.name);
  const [email, setEmail] = useState(invoiceData.email);
  const [address, setAddress] = useState(invoiceData.address);
  const [city, setCity] = useState(invoiceData.city);
  const [country, setCountry] = useState(invoiceData.country);
  const [postal, setPostal] = useState(invoiceData.postal);
  const [items, setItems] = useState(invoiceData.items);
  const [intialImage, setIntialImage] = useState(invoiceData.image);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [newitem, setNewitem] = useState({ name: "", price: "", quantity: "" });

  const [total, setTotal] = useState(0);
  const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" });

  const handleDownload = () => {
    toPDF();
  };

  useEffect(() => {
    if (image) {
      setIntialImage("");
    }
  }, [image]);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
    }
    const previewURLs = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreview(previewURLs);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  });

  // Handle Put Request
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("country", country);
        formData.append("city", city);
        formData.append("postal", postal);
        formData.append("items", JSON.stringify(items));

        if (image) {
          // Append the file with the correct field name
          formData.append("image", image); // Must match multer's field name
        }

        if (!image || intialImage === "") {
          formData.append("image", ""); // Must match multer's field name
        }

        const response = await axios.put(
          `http://localhost:3300/invoice/${invoiceData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for file uploads
            },
          }
        );
        showToast("Customer Editted", "success");
        console.log("Update Successful:", response.data);

        <SheetClose />;
      } catch (error) {
        console.error("Error updating data:", error);
        showToast("Error Adding Customer", "error");
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  const handleAddItem = () => {
    setItems([...items, newitem]);
    setNewitem({ name: "", price: "", quantity: "" });
    console.log(newitem);
  };

  const handleItemChange = (index, field, value) => {
    setNewitem({ ...newitem, [field]: value });
  };

  const handleRemoveTip = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // let total = 0;

  useEffect(() => {
    const handleTotal = () => {
      const _total = items.reduce((ini, item) => {
        ini += +item.price * +item.quantity;
        return ini;
      }, 0);
      setTotal(_total);
    };

    const unsub = handleTotal();
    return unsub;
  }, [items]);

  const elementStyles = {
    view: () => (
      <div className="h-[90vh] sheet__scrollbar overflow-y-scroll relative">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 !fixed top-2 left-2 text-black bg-primary1 w-fit p-2 shadow-lg rounded-lg z-[1000]"
        >
          <BiDownload className="text-white text-[17px]" />
        </button>
        <div ref={targetRef} className="text-black px-10 m-6">
          <div className="flex items-center gap-3 justify-center w-full mb-4">
            <img className="h-[50px] w-[50px]" src={logo} alt="logo" />
            <p className="font-bitter text-[20px]">Base</p>
          </div>
          <div className="flex items-center gap-5 mb-6">
            <p className="text-[20px]">Invoice</p>
            <div className="w-full h-[1px] rounded-full bg-slate-300" />
          </div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col gap-2">
              <div className="text-primary1 flex items-center gap-2">
                Address: <p className="text-black">No 8 Francis street</p>
              </div>
              <div className="text-primary1 flex items-center gap-2">
                City: <p className="text-black">Enugu</p>
              </div>
              <div className="text-primary1 flex items-center gap-2">
                Country: <p className="text-black">Nigeria</p>
              </div>
              <div className="text-primary1 flex items-center gap-2">
                Postal Code: <p className="text-black">400102</p>
              </div>
              <div className="text-primary1 flex items-center gap-2">
                Date:{" "}
                <p className="text-black">
                  {format(invoiceData.date, "MMM do, yyyy")}
                </p>
              </div>
              <div className="text-primary1 flex items-center gap-2">
                Due Date:{" "}
                <p className="text-red-500">
                  {format(addOneMonth(invoiceData.date), "MMM do, yyyy")}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Bill To:</p>
              <div className="text-primary1 flex items-center gap-2">
                Name: <p className="text-black">{name}</p>
              </div>
              <div className="text-primary1 flex items-center gap-2">
                Email: <p className="text-black">{email}</p>
              </div>
              <div className="text-primary1 flex items-center gap-2">
                Address: <p className="text-black">{address}</p>
              </div>
              <div className="text-primary1 flex items-center gap-2">
                City: <p className="text-black">{city}</p>
              </div>
              <div className="text-primary1 flex items-center gap-2">
                Country: <p className="text-black">{country}</p>
              </div>
              <div className="text-primary1 flex items-center gap-2">
                Postal Code: <p className="text-black">{postal}</p>
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] mb-4 rounded-full bg-slate-300" />
          <Table className="mb-4">
            <TableCaption className="hidden">
              A list of your recent invoices.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black">Name</TableHead>
                <TableHead className="text-black">Price</TableHead>
                <TableHead className="text-black">QTY</TableHead>
                <TableHead className="text-black">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell
                    className="text-center py-4"
                    colSpan={items.length + 1}
                  >
                    <div>No Items to Show</div>
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium capitalize">
                      {item.name}
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("en-Us", {
                        style: "currency",
                        currency: "USD",
                      }).format(item.price)}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("en-Us", {
                        style: "currency",
                        currency: "USD",
                      }).format(item.price * item.quantity)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="w-full h-[1px] mb-4 rounded-full bg-slate-300" />
          <div className="flex items-center mb-5 justify-between">
            <div>
              <p className="text-[11px] font-arvo font-semibold mb-3">NOTE :</p>
              <p>
                If the Invoice is not resolved by the given date <br /> the
                order will be cancelled
              </p>
            </div>
            <div>
              <p className="text-[11px] font-arvo font-semibold mb-3">
                TOTAL :
              </p>
              <p>
                {new Intl.NumberFormat("en-Us", {
                  style: "currency",
                  currency: "USD",
                }).format(total)}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center bg-gray-200 w-full">
            <div className="flex items-center gap-2 py-5">
              Powered by{" "}
              <img className="h-[30px] w-[30px]" src={logo} alt="logo" />
              <p className="font-bitter text-[17px] font-semibold">Base</p>
            </div>
          </div>
        </div>
      </div>
    ),
    edit: () => (
      <div>
        <h1 className="text-[16px] text-black font-semibold">Edit Invoice</h1>
        <div className="relative flex mt-3 items-center justify-center">
          <div
            {...getRootProps()}
            className=" flex items-center justify-center h-[130px] w-[130px] rounded-full bg-gray-300"
          >
            <input {...getInputProps()} />
            {!intialImage && !preview && (
              <IoIosCamera className="text-[35px]" />
            )}
            {intialImage && (
              <img
                src={`data:${invoiceData.mimetype};base64,${invoiceData.image}`}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            )}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </div>
          {intialImage && (
            <div
              onClick={() => {
                setIntialImage("");
              }}
              className="absolute top-1 translate-x-14"
            >
              <MdCancel />
            </div>
          )}
          {preview && (
            <div
              onClick={() => {
                setPreview("");
                setImage("");
              }}
              className="absolute top-1 translate-x-14"
            >
              <MdCancel />
            </div>
          )}
        </div>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[14px]">Name:</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[14px]">Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[14px]">Address:</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[14px]">City:</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <label className="text-[14px]">Country:</label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[14px]">Postal Code:</label>
            <input
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              type="text"
              className="w-[50%] px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <div className="flex items-center justify-between">
              <label className="text-[14px]">Items:</label>
              <Dialog>
                <DialogTrigger>
                  <div className="bg-primary1 p-1 rounded-sm cursor-pointer">
                    <GoPlus className="text-white" />
                  </div>
                </DialogTrigger>
                <DialogContent className="w-[400px]">
                  <DialogHeader>
                    <DialogTitle className="hidden">
                      Are you absolutely sure?
                    </DialogTitle>
                    <DialogDescription>
                      <h1 className="mb-2 text-[15px] text-black">
                        Product Description
                      </h1>
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                          <label>Name: </label>
                          <input
                            type="text"
                            value={newitem.name}
                            className="w-full px-3 py-2 border rounded-md outline-none"
                            onChange={(e) =>
                              handleItemChange(
                                items.length,
                                "name",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="flex gap-4">
                          <div className="flex flex-col gap-2">
                            <label>Price:</label>
                            <input
                              type="number"
                              value={newitem.price}
                              className="w-full px-3 py-2 border rounded-md outline-none"
                              onChange={(e) =>
                                handleItemChange(
                                  items.length,
                                  "price",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label>Quantity:</label>
                            <input
                              type="number"
                              value={newitem.quantity}
                              className="w-full px-3 py-2 border rounded-md outline-none"
                              onChange={(e) =>
                                handleItemChange(
                                  items.length,
                                  "quantity",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        <button
                          onClick={handleAddItem}
                          className="p-2 bg-primary1 rounded-md text-white"
                        >
                          Add Product
                        </button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <Table>
              <TableCaption className="hidden">
                A list of your recent invoices.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black">Name</TableHead>
                  <TableHead className="text-black">Price</TableHead>
                  <TableHead className="text-black">QTY</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell
                      className="text-center py-4"
                      colSpan={items.length + 1}
                    >
                      <div>No Items to Show</div>
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium capitalize">
                        {item.name}
                      </TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell onClick={() => handleRemoveTip(index)}>
                        <MdDelete className="text-[17px]" />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <button
            type="submit"
            className="flex justify-center mt-4 cursor-pointer text-center text-white rounded-md p-2 w-full bg-[#605BFF]"
          >
            {loading ? <Loader /> : "Edit Customer"}
          </button>
        </form>
      </div>
    ),
  };

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="p-0 flex flex-col w-[130px]">
        <InvoiceDialog elementStyles={elementStyles.view}>
          <div className="border-b flex gap-1 text-[#5B93FF] hover:bg-gray-100 p-3 text-[14px] items-center">
            <FaRegEye className="text-[17px]" />
            View
          </div>
        </InvoiceDialog>
        <CustomerSheet elementStyles={elementStyles.edit}>
          <div className="border-b flex gap-1 text-[#5B93FF] hover:bg-gray-100 p-3 text-[14px] items-center">
            <CiEdit className="text-[17px]" />
            Edit
          </div>
        </CustomerSheet>
        <TableAlertDialog>
          <div className="flex gap-1 text-[#E71D36] hover:bg-gray-100 p-3 text-[14px] items-center">
            <MdDelete className="text-[17px]" />
            Delete
          </div>
        </TableAlertDialog>
      </PopoverContent>
    </Popover>
  );
};

InvoicePopover.propTypes = {
  children: PropTypes.element,
  invoiceData: PropTypes.object.isRequired,
};

export default InvoicePopover;
