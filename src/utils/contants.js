import { BiSolidCategory } from "react-icons/bi";
import { IoMdAnalytics, IoMdNotifications, IoMdSettings } from "react-icons/io";
import { RiCoupon2Fill } from "react-icons/ri";
import { MdScheduleSend } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { HiChartSquareBar } from "react-icons/hi";
import heart from "../assets/icons/home/heart.svg";
import game from "../assets/icons/home/game.svg";
import bag from "../assets/icons/home/bag.svg";
import work from "../assets/icons/home/work.svg";

const sideBarMenu = [
  { Icon: BiSolidCategory, name: "Dashboard", path: "/dashboard" },
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

export { sideBarMenu, homeCategory };
