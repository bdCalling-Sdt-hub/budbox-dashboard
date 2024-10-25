import { MdOutlineNotificationsActive } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-full h-24 px-5 bg-[#111111] flex justify-between items-center text-white sticky top-0 left-0 z-10">
      <div>
        <h1 className="text-xl">Welcome, {user?.fullName}</h1>
        <span className="text-sm">Have a nice day</span>
      </div>
      <div className="flex justify-between items-center gap-8">
        <Link to={"/notification"}>
          <h1 className="relative">
            <MdOutlineNotificationsActive className="size-8" />
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
        <span>{user?.name}</span>
      </div>
    </div>
  );
};

export default Header;
