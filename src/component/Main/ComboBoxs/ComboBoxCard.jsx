/* eslint-disable react/prop-types */
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const ComboBoxCard = ({item}) => {
    console.log(item)
  return (
    <div className="w-full shadow-xl rounded-2xl ">
      <div className="w-full h-64 relative">
        <img
          src={`${imageBaseUrl}${item?.image?.url}`}
          alt="budBoxImage"
          className="w-full h-full absolute rounded-t-xl"
        />
      </div>
      <div className="w-full col-span-full md:col-span-8 p-5">
        <div className="w-full flex items-center gap-3 mb-5 ">
          <div className="w-20 h-2 rounded-2xl bg-yellow-400"></div>
          <h1>Combo Box</h1>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{item?.name}</h1>
        {/* <p className="text-sm py-3">{item?.description}</p> */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
          {item?.products?.map((product, i) => (
            <div
              key={i}
              className="flex items-center gap-1 font-semibold text-sm"
            >
              <h1>{i + 1}.</h1>
              <h1>{product}</h1>
            </div>
          ))}
        </div>
        <div className="flex gap-10">
          <button className="px-16 py-3 bg-yellow-500 rounded-lg text-white">
            Delete
          </button>
          <button className="px-16 py-3 border border-yellow-500 rounded-lg text-yellow-500">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComboBoxCard;
