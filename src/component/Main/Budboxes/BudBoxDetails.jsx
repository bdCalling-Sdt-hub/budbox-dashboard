// import { useParams } from "react-router-dom";
import budbox from '../../../../public/box/box.jpg'
const BudBoxDetails = () => {
  // const id = useParams();
  const item = {
    image: budbox,
    name: "Gourmet Delight Box",
    products: [
      "Organic Honey Jar",
      "Assorted Nuts",
      "Herbal Tea Mix",
      "Dark Chocolate Bar",
    ],
    priceRange: {
      start: 120,
      end: 699,
    },
    description:
      "An exquisite selection of gourmet delights for the food lover in you.",
  };
  return (
    <div className="w-full  grid grid-cols-1 md:grid-cols-12 gap-10 shadow-xl rounded-2xl mt-6">
      <div className="w-full h-96 col-span-full md:col-span-4 relative rounded-2xl ">
        <img
          src={item?.image}
          alt="budBoxImage"
          className="w-full h-full absolute rounded-l-2xl"
        />
      </div>
      <div className="w-full col-span-full md:col-span-8 p-5">
        <div className="w-full flex items-center gap-3 mb-5 ">
          <div className="w-20 h-2 rounded-2xl bg-yellow-400"></div>
          <h1>Budbox</h1>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{item?.name}</h1>
        <p className="text-sm py-3">{item?.description}</p>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
          {item?.products?.slice(0, 4)?.map((product, i) => (
            <div
              key={i}
              className="flex items-center gap-1 font-semibold text-sm"
            >
              <h1>{i + 1}.</h1>
              <h1>{product}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudBoxDetails;