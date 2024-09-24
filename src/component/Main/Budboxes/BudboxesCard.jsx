/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const BudboxesCard = ({ item }) => {
  const { name, image } = item;
  return (
    <div className="w-full group">
      <Link to={'/budboxes/budboxes-details/11'}>
      <div className="relative overflow-hidden  rounded-md">
        <img
          src={image}
          alt={name}
          className="w-full h-60 object-cover  rounded-md cursor-pointer "
        />
        <div className="absolute bg-black top-0 left-0 right-0 bottom-0 bg-opacity-25"></div>
        <div className="absolute left-3 bottom-5 gap-8 space-y-2">
          <div>
            <h1 className="text-2xl font-semibold text-white">{name}</h1>
          </div>
          <div className="flex gap-5">
            <button className="px-8 py-2 bg-[#f7cc50] text-white rounded text-sm">
              Delete
            </button>
            <Link to={`/budboxes/edit-box/${123456}`}>
              <button className="px-10 py-2 border border-[#f7cc50] text-white rounded text-sm">
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default BudboxesCard;
