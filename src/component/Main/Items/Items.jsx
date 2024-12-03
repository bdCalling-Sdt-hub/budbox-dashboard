import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import { useGetAllProductsQuery } from "../../../redux/features/product/productApi";
import { Spin, Pagination } from "antd";
import { useState } from "react";
import NoDataFound from "../NodataFound/NoDataFound";

const Items = () => {
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 8;
  const { data: responseData, isLoading } = useGetAllProductsQuery({
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
  } else if (!allItems?.length) {
    content = <NoDataFound message="No Items Found" />;
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
