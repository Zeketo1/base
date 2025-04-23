import { BiSolidCategory } from "react-icons/bi";
import { IoMdAnalytics, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { RiCoupon2Fill } from "react-icons/ri";
import { MdScheduleSend } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { HiChartSquareBar } from "react-icons/hi";
import heart from "../assets/home/heart.svg";
import game from "../assets/home/game.svg";
import bag from "../assets/home/bag.svg";
import work from "../assets/home/work.svg";
import camera from "../assets/home/camera.png";
import blackDress from "../assets/home/black-dress.png";
import oil from "../assets/home/oil.png";
import parfum from "../assets/home/parfum.png";
import shoe from "../assets/home/shoe.jpg";
import phone from "../assets/home/phone.jpg";
import ratings from "../assets/home/ratings.svg";
import box from "../assets/analytics/box.svg";
import cart from "../assets/analytics/cart.svg";
import headset from "../assets/analytics/headset.svg";
import airdot from "../assets/analytics/airdot.svg";
import shoe2 from "../assets/analytics/shoe.svg";
import kids from "../assets/analytics/kids.svg";
import watch from "../assets/analytics/watch.svg";
import badge from "../assets/analytics/badge.svg";
import top from "../assets/analytics/top.svg";
import { toast } from "react-toastify";

const sideBarMenu = [
  { Icon: BiSolidCategory, name: "Dashboard", path: "/" },
  { Icon: HiChartSquareBar, name: "Analytics", path: "/analytics" },
  { Icon: RiCoupon2Fill, name: "Invoice", path: "/invoice" },
  { Icon: MdScheduleSend, name: "Shedule", path: "/schedule" },
  { Icon: FaCalendarAlt, name: "Calendar", path: "/calendar" },
  { Icon: IoMdAnalytics, name: "Messages", path: "/messages" },
  { Icon: IoMdNotifications, name: "Notification", path: "/notification" },
  { Icon: IoMdSettings, name: "Settings", path: "/settings" },
];

const homeCategory = [
  { icon: heart, color: "5b92ff2e", num: 178, text: "Total sales  " },
  { icon: game, color: "ffd56b2e", num: 20, text: "Stock Products" },
  { icon: bag, color: "ff906b2e", num: 190, text: "Sales Products" },
  { icon: work, color: "615bff2e", num: 12, text: "Job Application" },
];

const tableHeaders = [
  "Tracking Num",
  "Product Name",
  "Price",
  "Total Order",
  "Total Amount",
];

const tableContent = [
  {
    tracking: "#876364",
    name: "Camera Lens",
    price: 178,
    quntity: 325,
    image: camera,
  },
  {
    tracking: "#876368",
    name: "Black Sleep Dress",
    price: 14,
    quntity: 53,
    image: blackDress,
  },
  {
    tracking: "#876412",
    name: "Argan Oil",
    price: 21,
    quntity: 78,
    image: oil,
  },
  {
    tracking: "#876621",
    name: "EAU DE Parfum",
    price: 32,
    quntity: 98,
    image: parfum,
  },
];

const topSelling = [
  { name: "Nike Air Max 270", price: 87, image: shoe, ratings },
  { name: "IPhone 12 Pro Max", price: 320, image: phone, ratings },
];

const productAnalytics = [
  {
    name: "Total Product",
    icon: box,
    quntityAdded: "+1400 New Added",
    totalProducts: "500,874",
    color: "5B93FF",
    glow: "5b92ff23",
    chartData: [
      { month: "January", desktop: 186 },
      { month: "February", desktop: 305 },
      { month: "March", desktop: 237 },
      { month: "April", desktop: 73 },
      { month: "May", desktop: 209 },
      { month: "June", desktop: 214 },
      { month: "July", desktop: 114 },
      { month: "August", desktop: 90 },
      { month: "September", desktop: 300 },
    ],
  },
  {
    name: "Total Sales",
    icon: cart,
    quntityAdded: "+1000 Sales Today",
    totalProducts: "204,300",
    color: "FFD66B",
    glow: "ffd56b23",
    chartData: [
      { month: "January", desktop: 120 },
      { month: "February", desktop: 50 },
      { month: "March", desktop: 170 },
      { month: "April", desktop: 95 },
      { month: "May", desktop: 180 },
      { month: "June", desktop: 220 },
      { month: "July", desktop: 145 },
      { month: "August", desktop: 75 },
      { month: "September", desktop: 280 },
    ],
  },
];

// DB intigration starts here

const analyticsTableHeader = [
  "SN",
  "Name",
  "Price",
  "Total Order",
  "Total Sales",
];

const analyticsTableData = [
  {
    sn: "1",
    image: headset,
    name: "Blutooth Devices",
    price: 57,
    totalOrder: 325,
    totalSales: "18,525",
    badge,
  },
  {
    sn: "2",
    image: airdot,
    name: "Airdot",
    price: 20,
    totalOrder: 237,
    totalSales: "4,740",
    badge,
  },
  {
    sn: "3",
    image: shoe2,
    name: "Shoes",
    price: 178,
    totalOrder: 325,
    totalSales: "57,850",
    badge,
  },
  {
    sn: "4",
    image: kids,
    name: "Kids T-Shirt",
    price: 14,
    totalOrder: 53,
    totalSales: "742",
  },
  {
    sn: "5",
    image: watch,
    name: "Smart Watch",
    price: 204,
    totalOrder: 78,
    totalSales: "15,912",
  },
  {
    sn: "6",
    image: top,
    name: "Girls Top",
    price: 32,
    totalOrder: 98,
    totalSales: "3,136",
  },
];

const custermerTableHeader = ["Name", "Email", "Phone Number", "Gender", "yoo"];

const invoiceTableHeader = [
  "",
  "Invoice Id",
  "Name",
  "Email",
  "Date",
  "Status",
];

const invoiceTableData = [
  {
    invoiceId: "#876364",
    name: "Arrora Gaur",
    email: "arroragaurl@gmail.com",
    date: "12 Dec, 2020",
    status: "complete",
  },
  {
    invoiceId: "#876123",
    name: "James Mulison",
    email: "jamesmulison@gmail.com",
    date: "10 Dec, 2020",
    status: "pending",
  },
  {
    invoiceId: "#876213",
    name: "Robert Bacins",
    email: "robertbacins@gmail.com",
    date: "09 Dec, 2020",
    status: "complete",
  },
  {
    invoiceId: "#876987",
    name: "Bethany Jackson",
    email: "bethanyjackson@gmail.com",
    date: "09 Dec, 2020",
    status: "cancelled",
  },
  {
    invoiceId: "#876543",
    name: "Michael Stern",
    email: "michaelstern@gmail.com",
    date: "15 Dec, 2020",
    status: "complete",
  },
  {
    invoiceId: "#876654",
    name: "Sophia Harris",
    email: "sophiaharris@gmail.com",
    date: "17 Dec, 2020",
    status: "pending",
  },
  {
    invoiceId: "#876765",
    name: "Liam Anderson",
    email: "liamanderson@gmail.com",
    date: "18 Dec, 2020",
    status: "complete",
  },
  {
    invoiceId: "#876876",
    name: "Olivia Carter",
    email: "oliviacarter@gmail.com",
    date: "19 Dec, 2020",
    status: "cancelled",
  },
  {
    invoiceId: "#876987",
    name: "Noah Peterson",
    email: "noahpeterson@gmail.com",
    date: "20 Dec, 2020",
    status: "pending",
  },
  {
    invoiceId: "#877098",
    name: "Emma Thompson",
    email: "emmathompson@gmail.com",
    date: "21 Dec, 2020",
    status: "complete",
  },
];

const showToast = (message, type) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    icon: type === "success" ? "🎉" : "⚠️",
    style: {
      backgroundColor: type === "success" ? "#48bb78" : "#f56565",
      color: "#fff",
    },
    className: `custom-toast-${type}`,
    bodyClassName: `custom-toast-${type}-body`,
  });
};

const formatPhoneNumber = (phone) => {
  // Check if it's a US number
  if (phone.startsWith("+1")) {
    const cleaned = phone.slice(2).replace(/\D/g, "");
    return `+1-${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
      6
    )}`;
  }

  // Check if it's a Nigerian number
  if (phone.startsWith("+234")) {
    const cleaned = phone.slice(4).replace(/\D/g, "");
    return `+234-${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
      6
    )}`;
  }

  // Return original if not US/Nigeria
  return phone;
};

function generateRandomSixDigitNumber() {
  // Generate a random number between 100000 and 999999
  return Math.floor(100000 + Math.random() * 900000);
}

function addOneMonth(isoDate) {
  const date = new Date(isoDate);
  
  // Add 1 month and handle edge cases (like month-end dates)
  const originalDate = date.getDate();
  date.setMonth(date.getMonth() + 1);
  
  // Check if the month rolled over due to invalid date
  if (date.getDate() !== originalDate) {
    // Adjust to last day of previous month if overflow occurred
    date.setDate(0);
  }
  
  return date.toISOString().replace(/\.\d{3}Z$/, '.000+00:00');
}

export {
  sideBarMenu,
  homeCategory,
  tableHeaders,
  tableContent,
  topSelling,
  productAnalytics,
  analyticsTableHeader,
  analyticsTableData,
  custermerTableHeader,
  invoiceTableHeader,
  invoiceTableData,
  showToast,
  formatPhoneNumber,
  generateRandomSixDigitNumber,
  addOneMonth
};
