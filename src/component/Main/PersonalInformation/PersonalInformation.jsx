import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useGetUserQuery } from "../../../redux/features/profile/profileApi";
import { useSelector } from "react-redux";

const PersonalInformation = () => {
  const { user: authUser } = useSelector((state) => state.auth);
  const { data: user } = useGetUserQuery(authUser?.id, {
    skip: !authUser,
  });

  console.log(user)
  return (
    <div className="w-full">
      {/* Back Button and Title */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center my-6">
          <Link to="/">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Personal Information</h1>
        </div>
        <Link to="/edit-personal-info">
          <button className="px-8 py-3 bg-black text-white rounded-lg">
            Edit Profile
          </button>
        </Link>
      </div>

      {/* Profile Information */}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 gap-8 mt-10">
        {/* Profile Picture */}
        <div className="w-full h-96 border col-span-full md:col-span-3 rounded-lg flex justify-center items-center flex-col gap-5">
          <img
            className="size-32 rounded-full mx-auto"
            src={`${imageBaseUrl}${user?.image?.url}`}
            alt=""
          />
          <span className="mt-2 text-gray-500">Profile</span>
          <span className="text-lg font-semibold uppercase">{user?.role}</span>
        </div>

        {/* Personal Details */}
        <form className="w-full col-span-full md:col-span-9 space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              defaultValue={user?.fullName}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-5 py-3 bg-white outline-none"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-5 py-3 bg-white outline-none"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold">Phone Number</label>
            <input
              type="text"
              defaultValue={user?.phone}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-5 py-3 bg-white outline-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInformation;
