import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useDeleteProductMutation } from "../../../redux/features/product/productApi";
import { toast } from "sonner";

const ItemCard = ({ item }) => {
  const [deleteProduct] = useDeleteProductMutation();
  const { id, name, price, image, weight } = item;

  const handleDelete = async (productId) => {
    try {
      const res = await deleteProduct(productId);
      console.log(res)
      if (res.error) {
        toast.error("Failed to delete product");
        return
      }else{
        toast.success("Product deleted successfully");
      }
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
        } // Fallback to a default image
        alt={name || "Product Image"} // Alt text fallback
        className="w-full h-56 rounded-t-lg object-cover"
      />

      <div className="p-5 space-y-2">
        {/* Name */}
        <h1 className="font-semibold text-lg">{name || "Unnamed Item"}</h1>

        {/* Price */}
        <h1 className="text-xl font-semibold">
          {price ? `$${price.toFixed(2)}` : "Price Not Available"}
        </h1>

        {/* Weight */}
        <p>{weight ? `${weight} grm` : "Weight Not Specified"}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center gap-5 px-5 pb-5">
        <button
          onClick={() => handleDelete(id)}
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

// PropTypes for better type checking
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
