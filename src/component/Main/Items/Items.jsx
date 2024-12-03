import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import { useGetAllProductsQuery } from "../../../redux/features/product/productApi";
import { Spin, Pagination } from "antd";
import { useState } from "react";

const Items = () => {
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 8; 
  const {
    data: responseData,
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const allItems = responseData?.results;
  const totalResults = responseData?.totalResults;

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
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 pb-10">
        {allItems?.map((item, i) => (
          <ItemCard key={i} item={item} />
        ))}
      </div>
    );
  }

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page
  };

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

      {/* Ant Design Pagination */}
      {totalResults > itemsPerPage && (
        <div className="flex justify-center py-5">
          <Pagination
            current={currentPage}
            total={totalResults}
            pageSize={itemsPerPage}
            onChange={handlePageChange} // Change the page
            showSizeChanger={false} // Optional: Disable the size changer
            className="pagination"
          />
        </div>
      )}
    </>
  );
};

export default Items;
