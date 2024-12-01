/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useDeleteProductMutation } from "../../../redux/features/product/productApi";
import { toast } from "sonner";
import Swal from "sweetalert2";

const ItemCard = ({ item }) => {
  const [deleteProduct] = useDeleteProductMutation();
  // eslint-disable-next-line react/prop-types
  const {
    id,
    name,
    price,
    image,
    weight,
    stockQuantity,
    weightUnit,
    description,
  } = item;
  // Show confirmation modal
  const showDeleteConfirm = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this Item? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      handleDelete(productId); // Proceed with deletion if confirmed
    }
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
        className="w-full h-36 md:h-40 lg:h-48 2xl:h-60 rounded-t-lg object-cover"
      />

      <div className="p-5 space-y-2">
        <div className="flex justify-between items-center gap-4">
          <h1 className="font-semibold text-xl">{name || "Unnamed Item"}</h1>
          <h1 className="text-xl font-semibold">
            {price ? `$${price}` : "Price Not Available"}
          </h1>
        </div>
        <p>{description ? `${description}` : "Description Not Available"}</p>

        <p className="text-sm font-semibold">
          Weight : {weight ? `${weight} ${weightUnit}` : "Weight Not Specified"}
        </p>
        <p className="text-sm font-semibold">
          Stock Quantity :{" "}
          {stockQuantity ? `${stockQuantity}` : "Weight Not Specified"}
        </p>
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
