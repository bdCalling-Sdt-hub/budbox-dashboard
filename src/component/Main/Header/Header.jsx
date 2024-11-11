/* eslint-disable react/prop-types */

import { MdOutlineNotificationsActive } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-full px-5 py-3.5 bg-[#111111] flex justify-between items-center text-white sticky top-0 left-0 z-10">
      <div className="flex items-center gap-3">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={toggleSidebar}
        >
          <FiMenu />
        </button>
        <div className="hidden md:block">
          <h1 className="text-xl">Welcome, {user?.fullName}</h1>
          <span className="text-sm">Have a nice day</span>
        </div>
      </div>

      <div className="flex justify-between items-center gap-8">
        <Link to={"/notification"}>
          <h1 className="relative">
            <MdOutlineNotificationsActive className="size-8" />{" "}
            <span className="absolute top-0 right-0 text-xs bg-[#f7cc50] size-4 flex justify-center items-center rounded-full text-gray-600">
            12 
            </span>
          </h1>
        </Link>
        <img
          onClick={() => navigate("/personal-info")}
          src={`${imageBaseUrl}${user?.image?.url}`}
          className="size-12 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
