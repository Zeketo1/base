import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import PropTypes from "prop-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { IoIosCamera } from "react-icons/io";
import { useCallback, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { showToast } from "@/utils/contants";
import { useDropzone } from "react-dropzone";
import { MdCancel } from "react-icons/md";

const CustomerDialog = ({ children }) => {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState();
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

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
        formData.append("occupation", occupation);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("age", age);
        formData.append("address", address);
        formData.append("gender", gender);

        // Append the file with the correct field name
        if (image) {
          formData.append("profileImage", image); // Must match multer's field name
        }
        const response = await axios.post(
          "http://localhost:3300/customer",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for file uploads
            },
          }
        );
        showToast("Customer Added", "success");
        console.log("Update Successful:", response.data);

        // Reset form fields
        setName("");
        setOccupation("");
        setEmail("");
        setPhone("");
        setAge("");
        setAddress("");
        setGender("");
        setImage("");
        setPreview("");
      } catch (error) {
        console.error("Error updating data:", error);
        showToast("Error Adding Customer", "error");
      } finally {
        setLoading(false);
      }
    }, 2000);
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
                    <label className="text-[14px]">Occupation:</label>
                    <input
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      required
                      placeholder="Software Developer"
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <label className="text-[14px]">Phone Number:</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+2347109740480"
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <label className="text-[14px]">Gender:</label>
                    <Select
                      value={gender}
                      onValueChange={(value) => setGender(value)}
                      required
                    >
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
                      placeholder="50"
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
                  <button
                    type="submit"
                    className="flex items-center justify-center relative mt-4 h-[40px] cursor-pointer text-center text-white rounded-md p-2 w-full bg-[#605BFF]"
                  >
                    {loading ? <Loader /> : "Add Customer"}
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

CustomerDialog.propTypes = {
  children: PropTypes.element,
};

export default CustomerDialog;
