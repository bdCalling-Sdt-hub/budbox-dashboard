import { Form, Select } from "antd";
import { useRef, useState } from "react";
import { IoCameraOutline, IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { useAddCategoryMutation } from "../../../redux/features/category/categoryApi";

const AddBox = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null); // To reference the hidden file input
  const [addBox, { isLoading }] = useAddCategoryMutation();
  const [form] = Form.useForm(); // Ant Design form instance
  const navigate = useNavigate();

  // Handle image change (preview the image)
  const handleImageChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImageFile(file);
      setImageUrl(newImageUrl); // Set the image URL for preview
    }
  };

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Open file dialog
    }
  };

  const onFinish = async (values) => {
    if(!imageFile){
      toast.error("Please select an image");
      return;
    }
    const formdata = new FormData();
    formdata.append("name", values.budBoxName);
    formdata.append("type", values.type);
    if (imageFile) {
      formdata.append("image", imageFile);
    }
    try {
      const response = await addBox(formdata);
      if (response.error) {
        console.log(response.error);
        toast.error(response.error.data.message);
      } else {
        toast.success("Bud Box added successfully");
        setImageFile(null);
        setImageUrl(null);
        form.resetFields();
        navigate("/budboxes");
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
        <h1 className="text-2xl font-semibold">Add BudBox</h1>
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
        style={{ display: "none" }} // Hidden input
      />

      {/* Form Section */}
      <Form form={form} layout="vertical" onFinish={onFinish} className="mt-5">
        <Form.Item
          label="BudBox Name"
          name="budBoxName"
          rules={[{ required: true, message: "Please enter the budbox name!" }]}
          className="w-full"
        >
          <CustomInput placeholder="Enter your budbox name" />
        </Form.Item>
        <Form.Item
          label="BudBox Name"
          name="type"
          rules={[{ required: true, message: "Please enter the budbox name!" }]}
          className="w-full"
        >
          <Select size="large" placeholder="Enter your budbox type">
            <Select.Option value="combo-box">Combo Box</Select.Option>
            <Select.Option value="build-box">Build Box</Select.Option>
          </Select>
        </Form.Item>

        {/* Submit Button */}
        <CustomButton loading={isLoading} border className="w-full">
          Add BudBox
        </CustomButton>
      </Form>
    </div>
  );
};

export default AddBox;
