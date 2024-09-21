import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiCurrencyCircleDollar, PiUsersThree } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineDatabase } from "react-icons/hi";
import logo from "/public/logo/logo.png";
import { BiCalendarEdit } from "react-icons/bi";
import { FiBox } from "react-icons/fi";


const sidebarItems = [
  {
    path: "/",
    name: "Dashboard",
    icon: <LuLayoutDashboard className="size-8" />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <PiUsersThree className="size-8" />,
  },
  {
    path: "/budboxes",
    name: "Budboxes",
    icon: <FiBox className="size-8" />,
  },
  {
    path: "/items",
    name: "Items",
    icon: <HiOutlineDatabase className="size-8" />,
  },
  {
    path: "/earnings",
    name: "Earnings",
    icon: <PiCurrencyCircleDollar className="size-8" />,
  },
  {
    path: "/orders",
    name: "Orders",
    icon: <BiCalendarEdit className="size-8" />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <IoSettingsOutline className="size-8" />,
  },
];
const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w- h-screen bg-[#111111] sticky top-0 left-0">
      <div className="flex flex-col justify-center items-center pt-5 gap-2 text-white">
        <img src={logo} alt="logo" className="w-56 h-24 mb-5" />
      </div>
      <div className="w-full h-[2px] bg-[#f7cc50] mb-5 " />
      <ul className="w-full flex flex-col gap-3">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "bg-[#333333] px-10 py-4 flex items-center gap-3  text-[#f7cc50]"
                : " px-10 py-4 flex items-center gap-3 text-[#f7cc50]"
            }
          >
            {item?.icon}
            <h>{item.name}</h>
          </NavLink>
        ))}
      </ul>
      <button
        onClick={() => navigate("auth")}
        className="flex items-center gap-2 px-10 py-4 text-rose-500 mt-16"
      >
        <IoIosLogOut className="size-8" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
