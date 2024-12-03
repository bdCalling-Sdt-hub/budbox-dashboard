import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useGetAllComboBoxQuery } from "../../../redux/features/combobox/comboboxApi";
import { IoChevronBack } from "react-icons/io5";
import { Pagination, Spin } from "antd";
import BuildBoxCard from "./BuildBoxCard";
import { useState } from "react";
import NoDataFound from "../NodataFound/NoDataFound";
const BuildBoxs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { data: comboboxs, isLoading } = useGetAllComboBoxQuery({
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
  } else if (!comboboxs?.results?.length) {
    content = <NoDataFound message="No Build Boxes Found" />;
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
