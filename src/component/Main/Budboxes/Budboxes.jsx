import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import BudboxesCard from "./BudboxesCard";
import { useGetAllCategoriesQuery } from "../../../redux/features/category/categoryApi";
import { Spin } from "antd";

const Budboxes = () => {
  const {
    data: boxesData,
    isLoading,
    isError,
    error,
  } = useGetAllCategoriesQuery();
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
  } else if (!boxesData?.length) {
    content = (
      <div className="w-full h-full text-center py-5 flex flex-col justify-center items-center">
        <img
          src="/src/assets/nodata/not-data.svg"
          alt="No results"
          className="w-[256px] mx-auto h-[256px] mb-4"
        />
        <h2 className="text-xl font-bold mb-2">No Bud Box Found</h2>
      </div>
    );
  } else {
    content = (
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
        {boxesData?.map((item, index) => {
          return <BudboxesCard key={index + 1} item={item} />;
        })}
      </div>
    );
  }
  return (
    <section>
      <div className="w-full flex justify-between items-center py-6">
        <h1 className="text-2xl font-semibold ">Budboxes</h1>
        <Link to={`/budboxes/add-box`}>
          <button className="px-10 py-3 bg-[#111111] text-white flex justify-center items-center gap-1 rounded text-sm">
            <FaPlus />
            Add BadBox
          </button>
        </Link>
      </div>
      {content}
    </section>
  );
};

export default Budboxes;
