import { MdOutlineNotificationsActive } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = {
    name: "Md Rakib Islam",
    email: "rakib.com",
    image: "https://i.postimg.cc/0QZmYnLd/rakib.png",
  };
  return (
    <div className="w-full h-24 px-5 bg-[#111111] flex justify-between items-center text-white sticky top-0 left-0 z-10">
      <div>
        <h1 className="text-xl">Welcome, Rakib</h1>
        <span className="text-sm">Have a nice day</span>
      </div>
      <div className="flex justify-between items-center gap-3">
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
          src={user.image}
          alt={user.name}
          className="size-12 rounded-full cursor-pointer"
        />
        <span>{user.name}</span>
      </div>
    </div>
  );
};

export default Header;
