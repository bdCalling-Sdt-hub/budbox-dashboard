// import { IoIosLogOut } from "react-icons/io";
// import { IoSettingsOutline } from "react-icons/io5";
// import { LuLayoutDashboard } from "react-icons/lu";
// import { PiCurrencyCircleDollar, PiUsersThree } from "react-icons/pi";
// import { NavLink, useNavigate } from "react-router-dom";
// import { HiOutlineDatabase } from "react-icons/hi";
// import logo from "/public/logo/logo.png";
// import { BiCalendarEdit } from "react-icons/bi";
// import { FiBox } from "react-icons/fi";
// import { useDispatch } from "react-redux";
// import { logoutUser } from "../../../redux/features/auth/authSlice";

// const sidebarItems = [
//   {
//     path: "/",
//     name: "Dashboard",
//     icon: <LuLayoutDashboard className="size-8" />,
//   },
//   {
//     path: "/users",
//     name: "Users",
//     icon: <PiUsersThree className="size-8" />,
//   },
//   {
//     path: "/budboxes",
//     name: "Budboxes",
//     icon: <FiBox className="size-8" />,
//   },
//   {
//     path: "/items",
//     name: "Items",
//     icon: <HiOutlineDatabase className="size-8" />,
//   },
//   {
//     path: "/earnings",
//     name: "Earnings",
//     icon: <PiCurrencyCircleDollar className="size-8" />,
//   },
//   {
//     path: "/orders",
//     name: "Orders",
//     icon: <BiCalendarEdit className="size-8" />,
//   },
//   {
//     path: "/settings",
//     name: "Settings",
//     icon: <IoSettingsOutline className="size-8" />,
//   },
// ];
// const Sidebar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate("/auth");
//   };
//   return (
//     <div className="w- h-screen bg-[#111111] sticky top-0 left-0">
//       <div className="flex flex-col justify-center items-center pt-5 gap-2 text-white">
//         <img src={logo} alt="logo" className="w-56 h-24 mb-5" />
//       </div>
//       <div className="w-full h-[2px] bg-[#f7cc50] mb-5 " />
//       <ul className="w-full flex flex-col gap-3">
//         {sidebarItems.map((item) => (
//           <NavLink
//             key={item.name}
//             to={item.path}
//             className={({ isActive }) =>
//               isActive
//                 ? "bg-[#333333] px-10 py-4 flex items-center gap-3  text-[#f7cc50]"
//                 : " px-10 py-4 flex items-center gap-3 text-[#f7cc50]"
//             }
//           >
//             {item?.icon}
//             <h>{item.name}</h>
//           </NavLink>
//         ))}
//       </ul>
//       <button
//         onClick={handleLogout}
//         className="flex items-center gap-2 px-10 py-4 text-rose-500 mt-16"
//       >
//         <IoIosLogOut className="size-8" />
//         <span>Logout</span>
//       </button>
//     </div>
//   );
// };

// export default Sidebar;



import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiCurrencyCircleDollar, PiUsersThree } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineDatabase } from "react-icons/hi";
import logo from "/public/logo/logo.png";
import { BiCalendarEdit } from "react-icons/bi";
import { FiBox } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/features/auth/authSlice";
import { useState } from "react";

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

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar toggle

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth");
  };

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-[300px] h-full bg-[#111111] fixed">
        <div className="flex flex-col justify-center items-center pt-5 gap-2 text-white">
          <img src={logo} alt="logo" className="w-56 h-24 mb-5" />
        </div>
        <div className="w-full h-[2px] bg-[#f7cc50] mb-5" />
        <ul className="w-full flex flex-col gap-3">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#333333] px-10 py-4 flex items-center gap-3 text-[#f7cc50]"
                  : "px-10 py-4 flex items-center gap-3 text-[#f7cc50]"
              }
            >
              {item?.icon}
              <h>{item.name}</h>
            </NavLink>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-10 py-4 text-rose-500 mt-16"
        >
          <IoIosLogOut className="size-8" />
          <span>Logout</span>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-[#111111] shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col justify-center items-center pt-5 gap-2 text-white">
          <img src={logo} alt="logo" className="w-56 h-24 mb-5" />
        </div>
        <div className="w-full h-[2px] bg-[#f7cc50] mb-5" />
        <ul className="w-full flex flex-col gap-3">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)} // Close sidebar on link click
              className={({ isActive }) =>
                isActive
                  ? "bg-[#333333] px-10 py-4 flex items-center gap-3 text-[#f7cc50]"
                  : "px-10 py-4 flex items-center gap-3 text-[#f7cc50]"
              }
            >
              {item?.icon}
              <h>{item.name}</h>
            </NavLink>
          ))}
        </ul>
        <button
          onClick={() => {
            handleLogout();
            setSidebarOpen(false); // Close sidebar on logout
          }}
          className="flex items-center gap-2 px-10 py-4 text-rose-500 mt-16"
        >
          <IoIosLogOut className="size-8" />
          <span>Logout</span>
        </button>
      </div>

      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#333333] text-white p-2 rounded-md shadow-lg"
      >
        {sidebarOpen ? "Close" : "Menu"}
      </button>
    </div>
  );
};

export default Sidebar;
