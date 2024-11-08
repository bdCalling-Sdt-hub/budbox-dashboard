import { useEffect, useRef, useState } from "react";
import { Form, Spin } from "antd";
import { IoCameraOutline, IoChevronBack } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../redux/features/product/productApi";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { MdOutlineAddAPhoto } from "react-icons/md";

const EditItem = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [updateItem, { isLoading }] = useUpdateProductMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: product, isLoading: singleProductLoading } =
    useGetProductByIdQuery(id, { skip: !id });

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        productName: product?.name,
        price: product?.price,
        weight: product?.weight,
        stockQuantity: product?.stockQuantity,
        description: product?.description,
      });
      setImageUrl(`${imageBaseUrl}${product.image?.url}`);
    }
  }, [product, form]);

  const handleImageChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImageFile(file);
      setImageUrl(newImageUrl);
    }
  };

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFinish = async (values) => {
    const formdata = new FormData();
    formdata.append("name", values.productName);
    formdata.append("price", values.price);
    formdata.append("weight", values.weight);
    formdata.append("stockQuantity", values.stockQuantity);
    formdata.append("description", values.description);
    if (imageFile) {
      formdata.append("image", imageFile);
    }

    try {
      const response = await updateItem({ id, formdata });
      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success(response.data.message);
        setImageFile(null);
        setImageUrl(null);
        form.resetFields();
        navigate("/items");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {singleProductLoading ? (
        <div className="flex justify-center items-center my-6">
          <Spin />
        </div>
      ) : (
        <div className="w-full">
          {/* Header */}
          <div className="flex gap-4 items-center my-6">
            <Link to={"/items"}>
              <IoChevronBack className="size-6" />
            </Link>
            <h1 className="text-2xl font-semibold">Edit Item</h1>
          </div>

          {/* Image Upload Section */}
          <div
            className="relative w-72 h-56 bg-[#e8ebf0] rounded-lg flex justify-center items-center cursor-pointer"
            onClick={handleDivClick}
          >
            {imageUrl ? (
              <>
                <img
                  src={imageUrl}
                  alt="Selected"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <span className="text-white font-semibold flex flex-col gap-3 justify-center items-center">
                    <MdOutlineAddAPhoto size={28} />
                    Change Image
                  </span>
                </div>
              </>
            ) : (
              <div className="bg-[#c6dadc] p-2 text-white">
                <IoCameraOutline size={40} />
              </div>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />

          {/* Form Section */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="mt-5"
          >
            <div className="w-full flex justify-between items-center gap-5 mb-4">
              {/* Product Name */}
              <Form.Item
                label="Product Name"
                name="productName"
                rules={[
                  { required: true, message: "Please enter the product name!" },
                ]}
                className="w-full"
              >
                <CustomInput placeholder="example wood" />
              </Form.Item>

              {/* Price */}
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please enter the price!" }]}
                className="w-full"
              >
                <CustomInput type="number" placeholder="example $100" />
              </Form.Item>
            </div>

            {/* Description */}
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please enter a description!" },
              ]}
            >
              <CustomInput
                placeholder="Product description"
                isTextArea
                rows={4}
              />
            </Form.Item>

            <div className="w-full flex justify-between items-center gap-5 mb-4">
              {/* Weight */}
              <Form.Item
                label="Weight"
                name="weight"
                rules={[
                  { required: true, message: "Please enter the weight!" },
                ]}
                className="w-full"
              >
                <CustomInput type="number" placeholder="example 15grm" />
              </Form.Item>

              {/* Stock Quantity */}
              <Form.Item
                label="Stock Quantity"
                name="stockQuantity"
                rules={[
                  {
                    required: true,
                    message: "Please enter the stock quantity!",
                  },
                ]}
                className="w-full"
              >
                <CustomInput type="number" placeholder="Stock quantity" />
              </Form.Item>
            </div>

            {/* Submit Button */}
            <CustomButton loading={isLoading} border className="w-full">
              Update Item
            </CustomButton>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditItem;
