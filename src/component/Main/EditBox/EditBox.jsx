import { Form, Select, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { IoCameraOutline, IoChevronBack } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";

import { imageBaseUrl } from "../../../config/imageBaseUrl";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../../redux/features/category/categoryApi";

const EditBox = () => {
  const { id } = useParams(); // Get BudBox ID from URL params
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { data: budBoxData, isLoading: singleCategoryLoading } =
    useGetCategoryByIdQuery(id); // Fetch the existing BudBox data
  const [updateBox, { isLoading }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (budBoxData) {
      form.setFieldsValue({
        budBoxName: budBoxData.name,
        type: budBoxData.type,
      });
      setImageUrl(`${imageBaseUrl}${budBoxData.image?.url}`); // Set initial image URL
    }
  }, [budBoxData, form]);

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
    const formdata = new FormData();
    formdata.append("name", values.budBoxName);
    formdata.append("type", values.type);
    if (imageFile) {
      formdata.append("image", imageFile); // Only add image if updated
    }

    try {
      const response = await updateBox({ id, data: formdata });
      console.log(response);
      if (response.error) {
        toast.error(response.error.data.message);
      }
      if (response.data) {
        toast.success("Bud Box updated successfully");
        navigate("/budboxes");
      }
    } catch (error) {
      console.error("Error updating BudBox:", error);
      toast.error("Something went wrong while updating the BudBox.");
    }
  };

  return (
    <>
      {singleCategoryLoading ? (
        <div className="w-full flex justify-center my-6">
          <Spin />
        </div>
      ) : (
        <div className="w-full pb-10">
          {/* Header */}
          <div className="flex gap-4 items-center my-6">
            <Link to="/budboxes">
              <IoChevronBack className="size-6" />
            </Link>
            <h1 className="text-2xl font-semibold">Edit BudBox</h1>
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
              budBoxName: budBoxData?.name,
              type: budBoxData?.type,
            }}
          >
            {/* BudBox Name */}
            <Form.Item
              label="BudBox Name"
              name="budBoxName"
              rules={[
                { required: true, message: "Please enter the budbox name!" },
              ]}
              className="w-full"
            >
              <CustomInput placeholder="Enter your budbox name" />
            </Form.Item>

            {/* BudBox Type */}
            <Form.Item
              label="Type"
              name="type"
              rules={[
                { required: true, message: "Please select the budbox type!" },
              ]}
              className="w-full"
            >
              <Select size="large" placeholder="Enter your budbox type">
                <Select.Option value="combo-box">Combo Box</Select.Option>
                <Select.Option value="build-box">Build Box</Select.Option>
              </Select>
            </Form.Item>

            {/* Submit Button */}
            <CustomButton loading={isLoading} className="w-full">
              Update BudBox
            </CustomButton>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditBox;
