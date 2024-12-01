import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useGetAllComboBoxQuery } from "../../../redux/features/combobox/comboboxApi";
import { IoChevronBack } from "react-icons/io5";
import { Pagination, Spin } from "antd";
import BuildBoxCard from "./BuildBoxCard";
import { useState } from "react";
const BuildBoxs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const {
    data: comboboxs,
    isError,
    isLoading,
    error,
  } = useGetAllComboBoxQuery({
    type: "build-box",
    page: currentPage,
    limit: itemsPerPage,
  });

  const totalResults = comboboxs?.totalResults;

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
  } else if (!comboboxs?.results?.length) {
    content = (
      <div className="w-full text-center py-5 flex flex-col justify-center items-center">
        <img
          src="/src/assets/nodata/not-data.svg"
          alt="No results"
          className="w-[256px] mx-auto h-[256px] mb-4"
        />
        <h2 className="text-xl font-bold mb-2">No Build Box Found</h2>
      </div>
    );
  } else {
    content = (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pb-10">
        {comboboxs?.results?.map((box, i) => (
          <BuildBoxCard key={i} item={box} />
        ))}
      </div>
    );
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="w-full flex justify-between gap-4 items-center">
        <div className="flex items-center gap-2">
          <Link to={"/budboxes"}>
            <IoChevronBack className="size-6" />
          </Link>
          <h1 className="text-2xl font-semibold my-6">Build Boxes</h1>
        </div>
        <Link to={`/budboxes/add-build-box`}>
          <button className="px-10 py-3 bg-[#111111] text-white flex justify-center items-center gap-1 rounded text-sm">
            <FaPlus />
            Add Build Box
          </button>
        </Link>
      </div>
      {content}
      {totalResults > itemsPerPage && (
        <div className="flex justify-center py-5">
          <Pagination
            current={currentPage}
            total={totalResults}
            pageSize={itemsPerPage}
            onChange={handlePageChange} // Update the current page
            showSizeChanger={false}
            className="pagination"
          />
        </div>
      )}
    </>
  );
};

export default BuildBoxs;
