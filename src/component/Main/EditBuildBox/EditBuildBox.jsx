import { Form, Select, Spin } from "antd";
import { useRef, useState, useEffect } from "react";
import { IoCameraOutline, IoChevronBack } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import {
  useGetComboBoxByIdQuery,
  useUpdateComboBoxMutation,
} from "../../../redux/features/combobox/comboboxApi"; // Add update and fetch query hooks
import { useGetAllProductsQuery } from "../../../redux/features/product/productApi";
import { imageBaseUrl } from "../../../config/imageBaseUrl";

const EditBuildBox = () => {
  const { id } = useParams(); // Get ComboBox ID from URL
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [updateComboBox, { isLoading }] = useUpdateComboBoxMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Fetch existing ComboBox data
  const { data: comboBoxData, isLoading: isComboBoxLoading } =
    useGetComboBoxByIdQuery(id);

  // Fetch products for dropdown
  const { data: productsData, isLoading: isProductLoading } =
    useGetAllProductsQuery();

  // Transform products data for Select options
  const productOptions =
    productsData?.map((product) => ({
      value: product.id,
      label: `${product.name} - $${product.price}`,
    })) || [];

  // Load existing ComboBox data into the form
  useEffect(() => {
    if (comboBoxData) {
      form.setFieldsValue({
        buildBoxName: comboBoxData.name,
        discount: comboBoxData.discount,
        products: comboBoxData.products.map((product) => product.id),
      });
      setImageUrl(`${imageBaseUrl}${comboBoxData.image.url}`);
    }
  }, [comboBoxData, form]);

  // Handle image change
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
    console.log("Products as JSON:", JSON.stringify(values.products));

    const formdata = new FormData();
    formdata.append("name", values.buildBoxName);
    formdata.append("products", JSON.stringify(values.products)); // Ensure this is valid JSON
    formdata.append("discount", values.discount || 0);

    if (imageFile) {
      formdata.append("image", imageFile); // Add image file only if updated
    }

    try {
      const response = await updateComboBox({ id, data: formdata });
      if (response.error) {
        toast.error(response.error.data.message);
      } else if (response.data) {
        toast.success("Build box updated successfully");
        navigate("/budboxes/build-box");
      }
    } catch (error) {
      console.error("Error updating build box:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {isComboBoxLoading ? (
        <div className="w-full flex justify-center my-6">
          <Spin />
        </div>
      ) : (
        <div className="w-full">
          {/* Header */}
          <div className="flex gap-4 items-center my-6">
            <Link to={"/budboxes/build-box"}>
              <IoChevronBack className="size-6" />
            </Link>
            <h1 className="text-2xl font-semibold">Edit Build Box</h1>
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
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="mt-5"
            initialValues={{
              comboBoxName: comboBoxData?.name,
              comboBoxPrice: comboBoxData?.price,
              discount: comboBoxData?.discount,
            }}
          >
            {/* ComboBox Name */}
            <Form.Item
              label="Build Box Name"
              name="buildBoxName"
              rules={[
                { required: true, message: "Please enter the Build Box name!" },
              ]}
              className="w-full"
            >
              <CustomInput placeholder="Enter build box name" />
            </Form.Item>

            {/* Include Products Dropdown */}
            <Form.Item
              label="Include Products"
              name="products"
              rules={[
                {
                  required: true,
                  message: "Please select at least one product!",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                size="large"
                placeholder="Select products to include"
                options={productOptions}
                loading={isProductLoading}
              />
            </Form.Item>

            {/* Discount */}
            <Form.Item
              label="Discount (%)"
              name="discount"
              rules={[{ required: false }]}
            >
              <CustomInput
                type="number"
                placeholder="Enter discount percentage"
              />
            </Form.Item>
            {/* Submit Button */}
            <CustomButton loading={isLoading} border className="w-full">
              Update ComboBox
            </CustomButton>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditBuildBox;
