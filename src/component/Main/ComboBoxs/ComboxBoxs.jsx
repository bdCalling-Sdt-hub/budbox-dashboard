import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useGetAllComboBoxQuery } from "../../../redux/features/combobox/comboboxApi";
import ComboBoxCard from "./ComboBoxCard";
import { IoChevronBack } from "react-icons/io5";
const ComboxBoxs = () => {
  const { data: comboboxs } = useGetAllComboBoxQuery();
  console.log(comboboxs)
  return (
    <>
      <div className="flex justify-between gap-4 items-center">
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
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 py-10 ">
        {comboboxs?.results?.map((box, i) => (
          <ComboBoxCard key={i} item={box} />
        ))}
      </div>
    </>
  );
};

export default ComboxBoxs;
