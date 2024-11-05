import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useGetAllComboBoxQuery } from "../../../redux/features/combobox/comboboxApi";
import ComboBoxCard from "./ComboBoxCard";
import { IoChevronBack } from "react-icons/io5";
import { Spin } from "antd";
const ComboxBoxs = () => {
  const {
    data: comboboxs,
    isError,
    isLoading,
    error,
  } = useGetAllComboBoxQuery("combo-box");
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
        <h2 className="text-xl font-bold mb-2">No Combo box Found</h2>
      </div>
    );
  } else {
    content = (
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
        {comboboxs?.results?.map((box, i) => (
          <ComboBoxCard key={i} item={box} />
        ))}
      </div>
    );
  }

  console.log(comboboxs);
  return (
    <>
      <div className="w-full flex justify-between gap-4 items-center">
        <div className="flex items-center gap-2">
          <Link to={"/budboxes"}>
            <IoChevronBack className="size-6" />
          </Link>
          <h1 className="text-2xl font-semibold my-6">Combo Boxes</h1>
        </div>
        <Link to={`/budboxes/add-combo-box`}>
          <button className="px-10 py-3 bg-[#111111] text-white flex justify-center items-center gap-1 rounded text-sm">
            <FaPlus />
            Add Combo Box
          </button>
        </Link>
      </div>
      {content}
    </>
  );
};

export default ComboxBoxs;
