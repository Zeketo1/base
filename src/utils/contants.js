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
import john from "../assets/customer/john.svg";
import jane from "../assets/customer/jane.svg";
import alice from "../assets/customer/alice.svg";
import bob from "../assets/customer/bob.svg";
import charlie from "../assets/customer/charlie.svg";
import mark from "../assets/customer/mark.svg";
import franklin from "../assets/customer/franklin.svg";
import grace from "../assets/customer/grace.svg";
import henry from "../assets/customer/henry.svg";
import min from "../assets/customer/min.jpg";
import josh from "../assets/customer/josh.svg";
import kelvin from "../assets/customer/kelvin.svg";
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
  { icon: heart, color: "5b92ff2e", num: 178, text: "Save Products" },
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

const customerData = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    image: john,
    phone: "+1-555-123-4567",
    gender: "Male",
    age: 28,
    address: "123 Maple St, Springfield, IL",
    occupation: "Software Engineer",
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    image: jane,
    phone: "+1-555-234-5678",
    gender: "Female",
    age: 32,
    address: "456 Oak St, Los Angeles, CA",
    occupation: "Graphic Designer",
  },
  {
    name: "Alice Johnson",
    email: "alicej@example.com",
    image: alice,
    phone: "+1-555-345-6789",
    gender: "Female",
    age: 25,
    address: "789 Pine St, Miami, FL",
    occupation: "Content Writer",
  },
  {
    name: "Bob Brown",
    email: "bobbrown@example.com",
    image: bob,
    phone: "+1-555-456-7890",
    gender: "Male",
    age: 45,
    address: "101 Elm St, Austin, TX",
    occupation: "Marketing Manager",
  },
  {
    name: "Charlie Davis",
    email: "charlied@example.com",
    image: charlie,
    phone: "+1-555-567-8901",
    gender: "Male",
    age: 38,
    address: "202 Cedar St, Denver, CO",
    occupation: "Project Manager",
  },
  {
    name: "Mark Evans",
    email: "markevans@example.com",
    image: mark,
    phone: "+1-555-678-9012",
    gender: "Male",
    age: 29,
    address: "303 Birch St, Seattle, WA",
    occupation: "UX Designer",
  },
  {
    name: "Franklin Moore",
    email: "franklinmoore@example.com",
    image: franklin,
    phone: "+1-555-789-0123",
    gender: "Male",
    age: 50,
    address: "404 Walnut St, Boston, MA",
    occupation: "Business Analyst",
  },
  {
    name: "Grace Wilson",
    email: "gracewilson@example.com",
    image: grace,
    phone: "+1-555-890-1234",
    gender: "Female",
    age: 26,
    address: "505 Aspen St, Portland, OR",
    occupation: "Data Scientist",
  },
  {
    name: "Henry King",
    email: "henryking@example.com",
    image: henry,
    phone: "+1-555-901-2345",
    gender: "Male",
    age: 30,
    address: "606 Fir St, Chicago, IL",
    occupation: "HR Specialist",
  },
  {
    name: "Min Lee",
    email: "minlee@example.com",
    image: min,
    phone: "+1-555-012-3456",
    gender: "Female",
    age: 34,
    address: "707 Spruce St, San Francisco, CA",
    occupation: "Web Developer",
  },
  {
    name: "Josh Martinez",
    email: "joshmartinez@example.com",
    image: josh,
    phone: "+1-555-123-4568",
    gender: "Female",
    age: 27,
    address: "808 Cypress St, Houston, TX",
    occupation: "Digital Marketer",
  },
  {
    name: "Kevin White",
    email: "kevinwhite@example.com",
    image: kelvin,
    phone: "+1-555-234-5679",
    gender: "Male",
    age: 42,
    address: "909 Redwood St, Phoenix, AZ",
    occupation: "Accountant",
  },
];

function generateRandomPercentages() {
  const random1 = Math.floor(Math.random() * 71) + 30; // Random number between 50 and 100
  const random2 = Math.floor(Math.random() * 71) + 30; // Random number between 50 and 100
  return [random1, random2];
}

const getRandomDesktopValue = () => Math.floor(Math.random() * 500) + 50;
const months = ["January", "February", "March", "April", "May", "June"];
const updatedCustomerData = customerData.map((customer) => ({
  ...customer,
  percent: generateRandomPercentages(),
  chartData: months.map((month) => ({
    month,
    desktop: getRandomDesktopValue(),
  })),
}));

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
      autoClose: 5000,
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
  updatedCustomerData,
  invoiceTableHeader,
  invoiceTableData,
  showToast
};
