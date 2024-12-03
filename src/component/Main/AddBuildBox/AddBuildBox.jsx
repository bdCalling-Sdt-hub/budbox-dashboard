import { Form, Select } from "antd";
import { useRef, useState } from "react";
import { IoCameraOutline, IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAddComboBoxMutation } from "../../../redux/features/combobox/comboboxApi";
import { useGetAllProductsQuery } from "../../../redux/features/product/productApi"; // Import the hook for fetching products
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { MdOutlineAddAPhoto } from "react-icons/md";

const AddComboBox = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [addComboBox, { isLoading }] = useAddComboBoxMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Fetch products using useGetAllProductsQuery
  const { data, isLoading: isProductLoading } = useGetAllProductsQuery({
    page: 1,
    limit: 5000,
  });

  // Transform the product data to match the format required by the Select options
  const productOptions =
    data?.results?.map((product) => ({
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
    if (!imageFile) {
      toast.error("Please select an image for the Build Box");
      return;
    }
    const formdata = new FormData();
    formdata.append("categoryType", "build-box"); // static category
    formdata.append("name", values.buildBoxName); // ComboBox Name
    formdata.append("products", JSON.stringify(values.products)); // Products as array
    formdata.append("discount", values.discount || 0); // Discount
    if (imageFile) {
      formdata.append("image", imageFile); // Add image file if present
    }

    try {
      const response = await addComboBox(formdata);
      if (response.error) {
        toast.error(response.error.data.message);
      }
      if (response.data) {
        toast.success("Build Box added successfully");
        setImageFile(null);
        setImageUrl(null);
        form.resetFields();
        navigate("/budboxes/build-box");
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
        <Link to={"/budboxes"}>
          <IoChevronBack className="size-6" />
        </Link>
        <h1 className="text-2xl font-semibold">Add Build Box</h1>
      </div>

      {/* Image Upload Section */}
      <div
        className="w-72 h-56 bg-[#e8ebf0] rounded-lg flex justify-center items-center cursor-pointer relative"
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
      <Form form={form} layout="vertical" onFinish={onFinish} className="mt-5">
        {/* ComboBox Name */}
        <Form.Item
          label="Build Box Name"
          name="buildBoxName"
          rules={[
            { required: true, message: "Please enter the Build Box name!" },
          ]}
          className="w-full"
        >
          <CustomInput placeholder="Enter Build Box name" />
        </Form.Item>

        {/* Include Products Dropdown */}
        <Form.Item
          label="Include Products"
          name="products"
          rules={[
            {
              validator: (_, value) =>
                value && value.length >= 3
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Please select at least 3 products")
                    ),
            },
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
          <CustomInput
            type="number"
            min="1"
            placeholder="Enter discount percentage"
          />
        </Form.Item>

        {/* Submit Button */}
        <CustomButton loading={isLoading} border className="w-full">
          Add Build Box
        </CustomButton>
      </Form>
    </div>
  );
};

export default AddComboBox;
