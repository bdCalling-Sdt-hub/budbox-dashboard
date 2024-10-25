import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useDeleteProductMutation } from "../../../redux/features/product/productApi";
import { toast } from "sonner";
import { Modal } from "antd"; // Import Ant Design's Modal component

const ItemCard = ({ item }) => {
  const [deleteProduct] = useDeleteProductMutation();
  const { id, name, price, image, weight } = item;

  // Show confirmation modal
  const showDeleteConfirm = (productId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      centered: true, // Centers the modal
      onOk: () => handleDelete(productId), // Delete item if confirmed
    });
  };

  const handleDelete = async (productId) => {
    try {
      const res = await deleteProduct(productId);
      if (res.error) {
        toast.error("Failed to delete product");
        return;
      }
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full rounded-lg border shadow-sm">
      {/* Image Handling with Fallback */}
      <img
        src={
          image && image.url
            ? `${imageBaseUrl}${image.url}`
            : "/images/default.png"
        }
        alt={name || "Product Image"}
        className="w-full h-56 rounded-t-lg object-cover"
      />

      <div className="p-5 space-y-2">
        <h1 className="font-semibold text-lg">{name || "Unnamed Item"}</h1>
        <h1 className="text-xl font-semibold">
          {price ? `$${price.toFixed(2)}` : "Price Not Available"}
        </h1>
        <p>{weight ? `${weight} grm` : "Weight Not Specified"}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center gap-5 px-5 pb-5">
        <button
          onClick={() => showDeleteConfirm(id)} // Show confirmation modal
          className="px-8 py-2 bg-[#f7cc50] text-white rounded text-sm"
        >
          Delete
        </button>

        <Link to={`/items/edit-item/${id}`}>
          <button className="px-10 py-2 border border-[#f7cc50] text-[#f7cc50] rounded text-sm">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

// PropTypes for type checking
ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.shape({
      url: PropTypes.string,
    }),
    weight: PropTypes.number,
  }).isRequired,
};

export default ItemCard;
