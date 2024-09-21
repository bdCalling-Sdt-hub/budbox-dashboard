import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import BudboxesCard from "./BudboxesCard";

const Budboxes = () => {
    const boxesData = [
        {
          name: "Concert",
          image: "https://i.postimg.cc/G2pFgc96/category.png",
        },
        {
          name: "Game",
          image: "https://i.postimg.cc/vmbL97yY/category2.png",
        },
      ];
  return (
    <section>
      <div className="w-full flex justify-between items-center px-3 py-6">
        <h1 className="text-xl font-semibold ">Budboxes</h1>
        <Link to={`/budboxes/add-box`}>
          <button className="px-8 py-2 bg-[#111111] text-white flex justify-center items-center gap-1 rounded text-sm">
            <FaPlus />
            Add Box
          </button>
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
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
