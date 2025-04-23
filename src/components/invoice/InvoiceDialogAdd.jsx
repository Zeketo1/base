import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import PropTypes from "prop-types";
import { IoIosCamera } from "react-icons/io";
import { useCallback, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { generateRandomSixDigitNumber, showToast } from "@/utils/contants";
import { useDropzone } from "react-dropzone";
import { MdCancel, MdDelete } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GoPlus } from "react-icons/go";

const InvoiceDialogAdd = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [items, setItems] = useState([]);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [newitem, setNewitem] = useState({ name: "", price: "", quantity: "" });

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

  // Handle form submission
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
        formData.append("invoiceId", `${generateRandomSixDigitNumber()}`);
        formData.append("items", JSON.stringify(items));

        // Append the file with the correct field name
        if (image) {
          formData.append("image", image); // Must match multer's field name
        }
        const response = await axios.post(
          "http://localhost:3300/invoice",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for file uploads
            },
          }
        );
        showToast("Invoice Added", "success");
        console.log("Update Successful:", response.data);

        // Reset form fields
        setName("");
        setEmail("");
        setCity("");
        setCountry("");
        setPostal("");
        setAddress("");
        setImage("");
        setPreview("");
        setItems([]);
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

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-[450px]">
        <DialogHeader>
          <DialogTitle className="hidden">Add Customer</DialogTitle>
          <DialogDescription>
            <div className="h-[90vh] overflow-y-scroll sheet__scrollbar">
              <div className="py-10 h-[90%]">
                <h1 className="text-black text-[18px] font-semibold">
                  Add Customer
                </h1>
                <div className="relative flex mt-3 items-center justify-center">
                  <div
                    {...getRootProps()}
                    className=" flex items-center justify-center h-[130px] w-[130px] rounded-full bg-gray-300"
                  >
                    <input {...getInputProps()} />
                    {!image && <IoIosCamera className="text-[35px]" />}
                    {preview && (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </div>
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
                      required
                      placeholder="Joe Doe"
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <label className="text-[14px]">Email:</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="joedoe@example.com"
                      type="email"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <label className="text-[14px]">Address:</label>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      placeholder="North Cresk, LA"
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
                        required
                        placeholder="Enugu"
                        type="text"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                      <label className="text-[14px]">Country:</label>
                      <input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        placeholder="North Cresk, LA"
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
                      required
                      placeholder="400110"
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
                              <div className="text-center">
                                No Items to Show
                              </div>
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
                    className="flex items-center justify-center relative mt-4 h-[40px] cursor-pointer text-center text-white rounded-md p-2 w-full bg-[#605BFF]"
                  >
                    {loading ? <Loader /> : "Add Invoice"}
                  </button>
                </form>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceDialogAdd;

InvoiceDialogAdd.propTypes = {
  children: PropTypes.element,
};
