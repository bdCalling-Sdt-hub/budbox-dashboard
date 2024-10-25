import { Form, Select } from "antd";
import { useRef, useState } from "react";
import { IoCameraOutline, IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { useAddComboBoxMutation } from "../../../redux/features/combobox/comboboxApi";
import { useGetAllProductsQuery } from "../../../redux/features/product/productApi"; // Import the hook for fetching products

const AddComboBox = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [addComboBox, { isLoading }] = useAddComboBoxMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Fetch products using useGetAllProductsQuery
  const { data, isLoading: isProductLoading } = useGetAllProductsQuery();

  // Transform the product data to match the format required by the Select options
  const productOptions =
    data?.map((product) => ({
      value: product.id,
      label: `${product.name} - $${product.price}`,
    })) || [];

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
      fileInputRef.current.click(); // Open file dialog
    }
  };

  const onFinish = async (values) => {
    if(!imageFile){
      toast.error("Please select an image for the ComboBox");
      return;
    }
    const formdata = new FormData();
    formdata.append("categoryType", "combo-box"); // static category
    formdata.append("name", values.comboBoxName); // ComboBox Name
    formdata.append("price", values.comboBoxPrice); // ComboBox Price
    formdata.append("products", JSON.stringify(values.products)); // Products as array
    formdata.append("discount", values.discount || 0); // Discount
    if (imageFile) {
      formdata.append("image", imageFile); // Add image file if present
    }

    try {
      const response = await addComboBox(formdata);
      if (response.error) {
        toast.error(response.error.data.message);
      } if (response.data) {
        toast.success("ComboBox added successfully");
        setImageFile(null);
        setImageUrl(null);
        form.resetFields();
        navigate("/budboxes/combo-box");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex gap-4 items-center my-6">
        <Link to={"/budboxes"}>
          <IoChevronBack className="size-6" />
        </Link>
        <h1 className="text-2xl font-semibold">Add ComboBox</h1>
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
        {/* ComboBox Name */}
        <Form.Item
          label="ComboBox Name"
          name="comboBoxName"
          rules={[
            { required: true, message: "Please enter the ComboBox name!" },
          ]}
          className="w-full"
        >
          <CustomInput placeholder="Enter ComboBox name" />
        </Form.Item>

        {/* Include Products Dropdown */}
        <Form.Item
          label="Include Products"
          name="products"
          rules={[
            { required: true, message: "Please select at least one product!" },
          ]}
        >
          <Select
            mode="multiple"
            allowClear
            size="large"
            placeholder="Select products to include"
            options={productOptions}
            loading={isProductLoading} // Show loading indicator while fetching products
          />
        </Form.Item>
        {/* Discount */}
        <Form.Item
          label="Discount (%)"
          name="discount"
          rules={[{ required: false }]}
        >
          <CustomInput type="number" min="1" placeholder="Enter discount percentage" />
        </Form.Item>
        {/* ComboBox Price */}
        <Form.Item
          label="ComboBox Price ($)"
          name="comboBoxPrice"
          rules={[
            { required: true, message: "Please enter the ComboBox price!" },
          ]}
          className="w-full"
        >
          <CustomInput type="number" placeholder="Enter ComboBox price" min="1"  />
        </Form.Item>
        {/* Submit Button */}
        <CustomButton loading={isLoading} border className="w-full">
          Add ComboBox
        </CustomButton>
      </Form>
    </div>
  );
};

export default AddComboBox;