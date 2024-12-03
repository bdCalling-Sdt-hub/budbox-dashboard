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
} from "../../../redux/features/combobox/comboboxApi";
import { useGetAllProductsQuery } from "../../../redux/features/product/productApi";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { MdOutlineAddAPhoto } from "react-icons/md";

const EditComboBox = () => {
  const { id } = useParams();
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
    useGetAllProductsQuery({
      page: 1,
      limit: 5000,
    });

  // Transform products data for Select options
  const productOptions =
    productsData?.results?.map((product) => ({
      value: product.id,
      label: `${product.name} - $${product.price}`,
    })) || [];

  // Load existing ComboBox data into the form
  useEffect(() => {
    if (comboBoxData) {
      form.setFieldsValue({
        comboBoxName: comboBoxData.name,
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
      fileInputRef.current.click();
    }
  };

  const onFinish = async (values) => {
    const formdata = new FormData();
    formdata.append("name", values.comboBoxName);
    formdata.append("products", JSON.stringify(values.products));
    formdata.append("discount", values.discount || 0);

    if (imageFile) {
      formdata.append("image", imageFile);
    }

    try {
      const response = await updateComboBox({ id, data: formdata });
      if (response.error) {
        toast.error(response.error.data.message);
      } else if (response.data) {
        toast.success("ComboBox updated successfully");
        navigate("/budboxes/combo-box");
      }
    } catch (error) {
      console.error("Error updating ComboBox:", error);
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
        <div className="w-full pb-10">
          {/* Header */}
          <div className="flex gap-4 items-center my-6">
            <Link to={"/budboxes/combo-box"}>
              <IoChevronBack className="size-6" />
            </Link>
            <h1 className="text-2xl font-semibold">Edit ComboBox</h1>
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
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="mt-5"
          >
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

export default EditComboBox;
