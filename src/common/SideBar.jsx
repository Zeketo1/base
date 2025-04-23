import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";
import Logo from "@/assets/Logo.svg";
import { sideBarMenu } from "@/utils/contants";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Sidebar = ({ active, setActive }) => {
  const location = useLocation();

  return (
    <div
      className={`${
        active
          ? "w-[250px] bg-white shadow-md px-0"
          : "w-[74px] bg-transparent pl-4"
      } sticky top-0 left-0 transition-all duration-500 h-screen py-4 mr-7`}
    >
      <div
        className={`relative w-full flex flex-col items-center justify-between ${
          !active && "shadow-md bg-white"
        } h-full py-6 rounded-md`}
      >
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col pl-3 h-[80px] w-full overflow-x-hidden">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="Logo" className="flex-shrink-0 w-9 h-9" />
              <AnimatePresence initial={false}>
                {active ? (
                  <motion.h1
                    initial={{ x: 200 }}
                    animate={{
                      x: 0,
                      transition: { delay: 0.1, duration: 0.3, ease: "easeIn" },
                    }}
                    exit={{
                      x: 200,
                      transition: { ease: "easeIn" },
                    }}
                    className="text-[18px] font-semibold"
                  >
                    Base
                  </motion.h1>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 w-full">
            {sideBarMenu.map(({ Icon, path, name }, i) => (
              <Link
                to={
                  i === 1 && location.pathname === "/customer"
                    ? location.pathname
                    : path
                }
                key={i}
                className={`flex pl-[18px] gap-5 items-center py-[7px] ${
                  location.pathname === path &&
                  "bg-gradient-to-r from-[#615bff5b] via-white to-white"
                } ${
                  i === 1 && location.pathname === "/customer"
                    ? "bg-gradient-to-r from-[#615bff5b] via-white to-white"
                    : null
                } w-full overflow-hidden`}
              >
                <Icon
                  className={`flex-shrink-0 text-[20px] ${
                    (i === 1 && location.pathname === "/customer") ||
                    location.pathname === path
                      ? "text-primary1"
                      : "text-slate-700"
                  }`}
                />
                <div>{name}</div>
              </Link>
            ))}
          </div>
        </div>
        <div
          className="bg-white p-2 rounded-full shadow-md   absolute -right-4 top-[130px]"
          onClick={() => setActive(!active)}
        >
          <MdOutlineKeyboardArrowRight
            className={`${active ? "rotate-180" : "rotate-0"} transition-all ease-in`}
          />
        </div>
        <div className="flex pl-[18px] gap-5 items-center w-full overflow-hidden">
          <TbLogout className="flex-shrink-0 text-[20px]" />
          <div>Logout</div>
        </div>
      </div>
    </div>
  );
};

// Add prop validation
Sidebar.propTypes = {
  active: PropTypes.bool.isRequired, // Must be a boolean
  setActive: PropTypes.func.isRequired, // Must be a function
};

export default Sidebar;
