import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoCameraOutline } from "react-icons/io5";

const EditItem = () => {
  return (
    <div className="w-full">
      <div className="flex gap-4 items-center  my-6">
        <Link to={"/items"}>
          <IoChevronBack className="size-6" />
        </Link>
        <h1 className="text-2xl font-semibold">Edit Item</h1>
      </div>
      <div>
        <div className="w-72 h-56 bg-[#e8ebf0] rounded-lg flex justify-center items-center">
          <div className="bg-[#c6dadc] p-2 text-white">
            <IoCameraOutline size={40} />
          </div>
        </div>
        <form action="" className="mt-5">
         <div className="w-full flex justify-between items-center gap-5 mb-4">
         <div className="w-full">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              name="productName"
              id="productName"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
          <div className="w-full">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="name"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
         </div>
          <button type="submit" className="w-full px-4 py-3 text-white bg-black rounded-lg mt-8">
            Edit Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
