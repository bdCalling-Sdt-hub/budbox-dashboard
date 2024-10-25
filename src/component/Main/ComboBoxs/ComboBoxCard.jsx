/* eslint-disable react/prop-types */
import { toast } from "sonner";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useDeleteComboboxMutation } from "../../../redux/features/combobox/comboboxApi";
import { Link } from "react-router-dom";

const ComboBoxCard = ({ item }) => {
  const [deleteComboBox] = useDeleteComboboxMutation();
  const handleDelete = async (comboboxId) => {
    try {
      const res = await deleteComboBox(comboboxId);
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.success("ComboBox deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete ComboBox");
    }
  };
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
        <h1 className="text-2xl font-bold text-gray-900">{item?.name}</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
          {item?.products?.map((product, i) => (
            <div
              key={i}
              className="flex items-center gap-1 font-semibold text-sm"
            >
              <h1>{i + 1}.</h1>
              <h1>{product?.name}</h1>
            </div>
          ))}
        </div>
        <h1 className="text-xl font-semibold py-3">${item?.price}</h1>
        <div className="flex gap-10">
          <button
            onClick={() => handleDelete(item.id)}
            className="px-16 py-3 bg-yellow-500 rounded-lg text-white"
          >
            Delete
          </button>
          <Link to={`/budboxes/edit-combo-box/${item?.id}`}>
            {" "}
            <button className="px-16 py-3 border border-yellow-500 rounded-lg text-yellow-500">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComboBoxCard;
