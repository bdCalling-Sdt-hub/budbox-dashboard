import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const ItemCard = ({ item }) => {
  const { name, price, image } = item;
  return (
    <div className="w-full rounded-lg border">
      <img
        src={image}
        alt={name}
        className="w-full h-56 rounded-lg object-cover"
      />
      <div className="p-5 space-y-2">
        <h1 className="font-semibold text-lg">{name}</h1>
        <h1 className="text-xl font-semibold">${price}</h1>
      </div>
      <div className="flex gap-5 px-5 pb-5">
        <button className="px-8 py-2 bg-[#f7cc50] text-white rounded text-sm">
          Delete
        </button>
        <Link to={`/items/edit-items/${123456}`}>
          <button className="px-10 py-2 border border-[#f7cc50] text-[#f7cc50]  rounded text-sm">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
