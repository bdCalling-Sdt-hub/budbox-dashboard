import nodataImage from "../../../assets/nodata/nodatafound.jpg";
// eslint-disable-next-line react/prop-types
const NoDataFound = ({ message }) => {
  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center">
      <img
        src={nodataImage}
        alt="nodataImage"
        className="w-[256px] h-[256px]"
      />
      <h1 className="text-2xl font-semibold text-gray-400">
        {message || "No Data Found"}
      </h1>
    </div>
  );
};

export default NoDataFound;
