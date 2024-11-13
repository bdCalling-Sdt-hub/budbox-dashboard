import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import { useGetAllProductsQuery } from "../../../redux/features/product/productApi";
import { Spin } from "antd";

const Items = () => {
  const {
    data: allItems,
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery();
  let content = null;
  if (isLoading) {
    content = (
      <div className="w-full flex justify-center py-10">
        <Spin />
      </div>
    );
  } else if (isError && error) {
    content = (
      <h3 className="font-semibold text-rose-500 text-center py-5">
        Something went wrong
      </h3>
    );
  } else if (!allItems?.length) {
    content = (
      <div className="w-full h-full text-center py-5 flex flex-col justify-center items-center">
        <img
          src="/src/assets/nodata/not-data.svg"
          alt="No results"
          className="w-[256px] mx-auto h-[256px] mb-4"
        />
        <h2 className="text-xl font-bold mb-2">No Items Found</h2>
      </div>
    );
  } else {
    content = (
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-10">
        {allItems?.map((item, i) => (
          <ItemCard key={i} item={item} />
        ))}
      </div>
    );
  }
  return (
    <>
      <div className="w-full flex justify-between items-center py-6">
        <h1 className="text-2xl font-semibold ">Items</h1>
        <Link to={`/items/add-item`}>
          <button className="px-8 py-3 bg-[#111111] text-white flex justify-center items-center gap-1 rounded text-sm">
            <FaPlus />
            Add Item
          </button>
        </Link>
      </div>
      {content}
    </>
  );
};

export default Items;
