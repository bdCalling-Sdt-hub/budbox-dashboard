/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useDeleteCategoryMutation } from "../../../redux/features/category/categoryApi";
import Swal from "sweetalert2"; // Import SweetAlert
import { toast } from "sonner";

const BudboxesCard = ({ item }) => {
  const [deleteBox] = useDeleteCategoryMutation();
  const { id, name, image, type } = item;

  // Handle delete confirmation using Swal
  const showDeleteConfirm = async (boxId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this BudBox? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      handleDelete(boxId); // Proceed with deletion if confirmed
    }
  };

  const handleDelete = async (boxId) => {
    try {
      const res = await deleteBox(boxId);
      if (res.error) {
        toast.error(res.error.data.message);
        return;
      }
      if (res.data) {
        toast.success("BudBox deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete BudBox");
    }
  };

  return (
    <div className="w-full group shadow-md rounded-xl">
      <Link to={`/budboxes/${type}`}>
        <img
          // eslint-disable-next-line react/prop-types
          src={`${imageBaseUrl}${image?.url}`}
          alt={name}
          className="w-full h-44 lg:h-56 xl:h-60 object-cover rounded-md z-30 cursor-pointer z-0"
        />
      </Link>
      <div className="p-5 space-y-4">
        <div>
          <h1 className="text-2xl font-semibold ">{name}</h1>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-5 my-5">
          <button
            onClick={() => showDeleteConfirm(id)} // Show confirmation dialog
            className="px-8 py-2 bg-[#f7cc50] text-white rounded text-sm"
          >
            Delete
          </button>
          <Link to={`/budboxes/edit-box/${id}`}>
            <button className="px-10 py-2 border border-[#f7cc50] text-[#f7cc50] rounded text-sm">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BudboxesCard;
