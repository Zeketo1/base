import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import PropTypes from "prop-types";
import { CiEdit } from "react-icons/ci";
import { MdCancel, MdDelete } from "react-icons/md";
import TableAlertDialog from "./TableAlertDialog";
import CustomerSheet from "./customer/CustomerSheet";
import { FaRegEye } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdPhone } from "react-icons/md";
import { CustomerBarChart } from "./customer/CustomerBarChart";
import { RadialChartText } from "./RadialChartText";
import { IoIosCamera } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import DefaultImg from "../assets/customer/default.jpg";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatPhoneNumber, showToast } from "@/utils/contants";
import axios from "axios";
import { SheetClose } from "./ui/sheet";
import Loader from "./Loader";

const TablePopover = ({ children, customerData }) => {
  const chartData = [{ browser: "safari", visitors: 70, fill: "#FFD66B" }];

  const chartData2 = [{ browser: "safari", visitors: 60, fill: "#5B93FF" }];

  const [name, setName] = useState(customerData.name);
  const [occupation, setOccupation] = useState(customerData.occupation);
  const [email, setEmail] = useState(customerData.email);
  const [phone, setPhone] = useState(customerData.phone);
  const [age, setAge] = useState(customerData.age);
  const [address, setAddress] = useState(customerData.address);
  const [gender, setGender] = useState(customerData.gender);
  const [intialImage, setIntialImage] = useState(customerData.profileImage);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

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
        formData.append("occupation", occupation);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("age", age);
        formData.append("address", address);
        formData.append("gender", gender);

        if (image) {
          // Append the file with the correct field name
          formData.append("profileImage", image); // Must match multer's field name
        }

        if (!image || intialImage === "") {
          formData.append("profileImage", ""); // Must match multer's field name
        }
        
        const response = await axios.put(
          `http://localhost:3300/customer/${customerData._id}`,
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

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3300/customer/${customerData._id}`
      );
      showToast("Customer Deleted Successful", "success");
      console.log("Delete Successful:", response.data);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const elementStyles = {
    view: () => (
      <div className="py-5">
        <div className="border-b pb-5 flex flex-col items-center justify-center gap-3">
          {customerData.profileImage ? (
            <img
              src={`data:${customerData.mimetype};base64,${customerData.profileImage}`}
              alt={customerData.name}
              className="h-[130px] w-[130px] object-cover rounded-full"
            />
          ) : (
            <img
              src={DefaultImg}
              alt="default"
              className="h-[130px] w-[130px] object-cover rounded-full"
            />
          )}
          <h1 className="text-[19px] text-black">{customerData.name}</h1>
          <p>{customerData.occupation}</p>
        </div>
        <div className="flex flex-col gap-4 py-5">
          <h1 className="text-[16px] font-semibold text-black">Contact Info</h1>
          <div>
            <div className="flex gap-2 items-center border-b pb-3 pl-3">
              <IoIosMail className="text-[23px]" />
              <p className="text-[15px]">{customerData.email}</p>
            </div>
            <div className="flex gap-2 items-center border-b py-3 pl-3">
              <MdPhone className="text-[23px]" />
              <p className="text-[15px]">
                {formatPhoneNumber(customerData.phone)}
              </p>
            </div>
            <div className="flex gap-2 items-center border-b py-3 pl-3">
              <IoLocationSharp className="text-[23px]" />
              <p className="text-[15px]">{customerData.address}</p>
            </div>
          </div>
          <CustomerBarChart chartData={customerData.chartData} />
          <div className="grid grid-cols-2 gap-3">
            <RadialChartText
              chartData={chartData}
              endAngle={customerData.percent[0]}
            />
            <RadialChartText
              chartData={chartData2}
              endAngle={customerData.percent[1]}
            />
          </div>
        </div>
      </div>
    ),
    edit: () => (
      <div>
        <h1 className="text-[16px] text-black font-semibold">Edit Customer</h1>
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
                src={`data:${customerData.mimetype};base64,${customerData.profileImage}`}
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
            <label className="text-[14px]">Occupation:</label>
            <input
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[14px]">Phone Number:</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[14px]">Gender:</label>
            <Select value={gender} onValueChange={(value) => setGender(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <label className="text-[14px]">Age:</label>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
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
        <CustomerSheet elementStyles={elementStyles.view}>
          <div className="border-b flex gap-1 text-orange-500  hover:bg-gray-100 p-3 text-[14px] items-center">
            <FaRegEye className="text-[17px]" />
            View
          </div>
        </CustomerSheet>
        <CustomerSheet elementStyles={elementStyles.edit}>
          <div className="border-b flex gap-1 text-[#5B93FF] hover:bg-gray-100 p-3 text-[14px] items-center">
            <CiEdit className="text-[17px]" />
            Edit
          </div>
        </CustomerSheet>
        <TableAlertDialog handleDelete={handleDelete}>
          <div className="flex gap-1 text-[#E71D36] hover:bg-gray-100 p-3 text-[14px] items-center">
            <MdDelete className="text-[17px]" />
            Delete
          </div>
        </TableAlertDialog>
      </PopoverContent>
    </Popover>
  );
};

TablePopover.propTypes = {
  children: PropTypes.element,
  customerData: PropTypes.object.isRequired,
};

export default TablePopover;
