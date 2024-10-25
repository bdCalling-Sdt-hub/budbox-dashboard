/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useDeleteCategoryMutation } from "../../../redux/features/category/categoryApi";
import { toast } from "sonner";

const BudboxesCard = ({ item }) => {
  const [deleteBox] = useDeleteCategoryMutation();
  const { id, name, image, type } = item;

  const handleDelete = async (boxId) => {
    try {
      const res = await deleteBox(boxId);
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message);
        return;
      }
    } catch (error) {
      toast.error("Failed to delete box");
    }
  };
  return (
    <div className="w-full group">
      <div className="relative overflow-hidden  rounded-md">
        <img
          src={`${imageBaseUrl}${image?.url}`}
          alt={name}
          className="w-full h-96 object-cover  rounded-md cursor-pointer "
        />
        <div className="absolute bg-black top-0 left-0 right-0 bottom-0 bg-opacity-25"></div>
        <div className="absolute left-3 bottom-5 gap-8 space-y-2">
          <div>
            <h1 className="text-2xl font-semibold text-white">{name}</h1>
          </div>
          <div className="flex gap-5">
            <button
              onClick={() => handleDelete(id)}
              className="px-10 py-3 bg-[#f7cc50] text-white rounded text-sm"
            >
              Delete
            </button>
            <Link to={`/budboxes/edit-box/${id}`}>
              <button className="px-12 py-3 border border-[#f7cc50] text-white rounded text-sm">
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudboxesCard;
