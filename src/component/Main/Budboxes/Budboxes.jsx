import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import BudboxesCard from "./BudboxesCard";
import { useGetAllCategoriesQuery } from "../../../redux/features/category/categoryApi";
import { Spin } from "antd";
import NoDataFound from "../NodataFound/NoDataFound";

const Budboxes = () => {
  const { data: boxesData, isLoading } = useGetAllCategoriesQuery();
  let content = null;
  if (isLoading) {
    content = (
      <div className="w-full flex justify-center py-10">
        <Spin />
      </div>
    );
  } else if (!boxesData?.length) {
    content = <NoDataFound message="No Budboxes Found" />;
  } else {
    content = (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
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
