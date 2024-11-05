/* eslint-disable react/prop-types */
import { toast } from "sonner";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useDeleteComboboxMutation } from "../../../redux/features/combobox/comboboxApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ComboBoxCard = ({ item }) => {
  const [deleteComboBox] = useDeleteComboboxMutation();

  const showDeleteConfirm = async (comboboxId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this Combo Box? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      handleDelete(comboboxId); // Proceed with deletion if confirmed
    }
  };
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
              <p className="text-sm font-semibold">{`($${product.price})`}</p>
            </div>
          ))}
        </div>
       <div className="text-gray-800">
       <h1 className="text-lg font-semibold py-2">Price : ${item?.mainPrice}</h1>
        <h1 className="text-lg font-semibold py-2">Discount : {item?.discount}%</h1>

       </div>
        <div className="flex gap-10 mt-4 justify-between items-center">
          <button
            onClick={() => showDeleteConfirm(item.id)}
            className="px-8 py-2 bg-yellow-500 rounded-lg text-white"
          >
            Delete
          </button>
          <Link to={`/budboxes/edit-combo-box/${item?.id}`}>
            <button className="px-10 py-2 border border-yellow-500 rounded-lg text-yellow-500">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComboBoxCard;
