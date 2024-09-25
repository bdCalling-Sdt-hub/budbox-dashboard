import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const EditPersonalInfo = () => {
  return (
    <div className="w-full">
      {/* Back Button and Title */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center my-6">
          <Link to="/personal-info">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Edit Information</h1>
        </div>
        <button className="px-8 py-3 bg-black text-white rounded-lg">
          Edit Profile
        </button>
      </div>

      {/* Profile Information */}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 gap-8 mt-10">
        {/* Profile Picture */}
        <div className="w-full h-96 border col-span-full md:col-span-3 rounded-lg flex justify-center items-center flex-col gap-5">
          <div className="size-32 rounded-full border">

          </div>
          <span className="mt-2 text-gray-500">Profile</span>
          <span className="text-lg font-semibold">Admin</span>
        </div>

        {/* Personal Details */}
        <form className="w-full col-span-full md:col-span-9 space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              defaultValue="Will"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-5 py-3 bg-white outline-none"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              defaultValue="will@gmail.com"
              placeholder="Enter your email"
              readOnly
              className="w-full border border-gray-300 rounded-lg px-5 py-3 bg-white outline-none"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold">Phone Number</label>
            <input
              type="text"
              defaultValue="+1242 3000597212"
               placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-5 py-3 bg-white outline-none"
            />
          </div>
          <button className="w-full py-3 bg-black text-white rounded-lg">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditPersonalInfo;
