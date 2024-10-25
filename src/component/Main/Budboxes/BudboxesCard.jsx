/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useDeleteCategoryMutation } from "../../../redux/features/category/categoryApi";
import { toast } from "sonner";
import { Modal } from "antd"; // Import Ant Design's Modal component

const BudboxesCard = ({ item }) => {
  const [deleteBox] = useDeleteCategoryMutation();
  const { id, name, image, type } = item;

  // Handle delete confirmation
  const showDeleteConfirm = (boxId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this BudBox?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      centered: true,
      onOk: () => handleDelete(boxId), // Proceed with deletion on confirmation
    });
  };

  const handleDelete = async (boxId) => {
    try {
      const res = await deleteBox(boxId);
      if (res.error) {
        toast.error(res.error.data.message);
        return;
      }
      toast.success("BudBox deleted successfully");
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
          className="w-full h-96 object-cover rounded-md z-30 cursor-pointer z-0"
        />
      </Link>
      <div className="p-5 space-y-4">
        <div>
          <h1 className="text-2xl font-semibold ">{name}</h1>
        </div>
        <div className="flex justify-between items-center gap-5 ">
          <button
            onClick={() => showDeleteConfirm(id)} // Show confirmation dialog
            className="px-10 py-3 bg-[#f7cc50] text-white rounded text-sm"
          >
            Delete
          </button>
          <Link to={`/budboxes/edit-box/${id}`}>
            <button className="px-12 py-3 border border-[#f7cc50] text-[#f7cc50] rounded text-sm">
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BudboxesCard;
