import { Form, Select } from "antd";
import { useRef, useState } from "react";
import { IoCameraOutline, IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAddProductMutation } from "../../../redux/features/product/productApi";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";

const AddItem = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [addItem, { isLoading }] = useAddProductMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Handle image change (preview the image)
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
    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }
    const formdata = new FormData();
    formdata.append("name", values.productName);
    formdata.append("price", values.price);
    formdata.append("weight", values.weight);
    formdata.append("weightUnit", values.weightUnit); 
    formdata.append("stockQuantity", values.quantity);
    formdata.append("description", values.description); // Add description to form data
    formdata.append("image", imageFile);

    try {
      const response = await addItem(formdata);
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
      console.error("Error adding item:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full pb-10">
      {/* Header */}
      <div className="flex gap-4 items-center my-6">
        <Link to={"/items"}>
          <IoChevronBack className="size-6" />
        </Link>
        <h1 className="text-2xl font-semibold">Add Item</h1>
      </div>

      {/* Image Upload Section */}
      <div
        className="w-72 h-56 bg-[#e8ebf0] rounded-lg flex justify-center items-center cursor-pointer"
        onClick={handleDivClick}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Selected"
            className="w-full h-full object-cover rounded-lg"
          />
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
      <Form form={form} layout="vertical" onFinish={onFinish} className="mt-5">
        <div className="w-full flex justify-between items-center gap-5 mb-4">
          {/* Product Name */}
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true, message: "Please enter the product name!" }]}
            className="w-full"
          >
            <CustomInput placeholder="Product Name" />
          </Form.Item>

          {/* Price */}
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price!" }]}
            className="w-full"
          >
            <CustomInput type="number" placeholder="$100" />
          </Form.Item>
        </div>

        {/* Description Field */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description!" }]}
          className="mb-4"
        >
          <CustomInput isTextArea placeholder="Description" />
        </Form.Item>

        <div className="w-full flex justify-between items-center gap-5 mb-4">
          {/* Weight */}
          <Form.Item
            label="Weight"
            name="weight"
            rules={[{ required: true, message: "Please enter the weight!" }]}
            className="w-full"
          >
            <CustomInput type="number" placeholder="Weight" />
          </Form.Item>
          <Form.Item
            label="Weight Unit"
            name="weightUnit"
            rules={[
              { required: true, message: "Please select a weight unit!" },
            ]}
            className="w-full"
          >
            <Select size="large" placeholder="Select Unit">
              <Select.Option value="g">g</Select.Option>
              <Select.Option value="mg">mg</Select.Option>
              <Select.Option value="oz">oz</Select.Option>
            </Select>
          </Form.Item>

          {/* Quantity */}
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please enter the quantity!" }]}
            className="w-full"
          >
            <CustomInput type="number" placeholder="Quantity" />
          </Form.Item>
        </div>

        {/* Submit Button */}
        <CustomButton loading={isLoading} border className="w-full">
          Add Item
        </CustomButton>
      </Form>
    </div>
  );
};

export default AddItem;
