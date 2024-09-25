import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import box1 from '../../../../public/box/box.jpg'
import BudboxesCard from "./BudboxesCard";

const Budboxes = () => {
    const boxesData = [
        {
          name: "Combo Box",
          image: box1,
        },
        {
          name: "Build Your Own Box",
          image: "https://i.postimg.cc/vmbL97yY/category2.png",
        },
      ];
  return (
    <section>
      <div className="w-full flex justify-between items-center py-6">
        <h1 className="text-2xl font-semibold ">Budboxes</h1>
        <Link to={`/budboxes/add-box`}>
          <button className="px-10 py-3 bg-[#111111] text-white flex justify-center items-center gap-1 rounded text-sm">
            <FaPlus />
            Add Box
          </button>
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {
          boxesData.map((item, index) => {
            return <BudboxesCard key={index + 1} item={item} />
          })
        }
      </div>
    </section>
  );
};

export default Budboxes;
