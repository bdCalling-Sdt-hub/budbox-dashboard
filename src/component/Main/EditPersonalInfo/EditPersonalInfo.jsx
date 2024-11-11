import { Form } from "antd";
import { useEffect, useState, useRef } from "react";
import { IoChevronBack, IoCameraOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../../../redux/features/profile/profileApi";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/features/auth/authSlice";

const EditInformation = () => {
  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateProfileInfo, { isLoading }] = useUpdateUserMutation();

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    user?.image ? `${imageBaseUrl}${user.image.url}` : null
  );
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, form]);

  const handleImageChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImageFile(file); // Store file to send on update
      setImageUrl(newImageUrl); // Show preview
    }
  };

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Open file dialog
    }
  };

  const onFinish = async (values) => {
    const formdata = new FormData();
    formdata.append("fullName", values.fullName);
    formdata.append("email", values.email);
    formdata.append("phone", values.phone);
    if (imageFile) {
      formdata.append("image", imageFile); // Add image if updated
    }

    try {
      const response = await updateProfileInfo(formdata);
      if (response.error) {
        toast.error(response.error.data.message);
      }
      if (response.data) {
        dispatch(updateUser({ user: response?.data?.attributes }));
        toast.success("Profile updated successfully!");
        navigate("/personal-info");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong while updating your profile.");
    }
  };

  return (
    <div className="w-full">
      {/* Back Button and Title */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center my-6">
          <Link to="/personal-info">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Edit Information</h1>
        </div>
      </div>

      {/* Profile Information */}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Profile Picture */}
        <div className="w-full h-full mt-10 border col-span-full md:col-span-3 rounded-lg flex justify-center items-center flex-col gap-5">
          <div
            className="relative cursor-pointer w-32 h-32"
            onClick={handleDivClick}
          >
            {imageUrl ? (
              <img
                className="rounded-full w-full h-full object-cover"
                src={imageUrl}
                alt="Profile Preview"
              />
            ) : (
              <div className="bg-[#c6dadc] p-2 text-white flex flex-col items-center rounded-full w-full h-full">
                <IoCameraOutline size={40} />
                <span>Upload Image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-sm text-center">
                Change Image
              </p>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
          <span className="mt-2 text-gray-500">Profile</span>
          <span className="text-lg font-semibold uppercase">{user?.role}</span>
        </div>

        {/* Edit Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="w-full col-span-full md:col-span-9 space-y-6 mt-10"
        >
          {/* Full Name */}
          <Form.Item label="Full Name" name="fullName">
            <CustomInput placeholder="Enter your full name" />
          </Form.Item>

          {/* Email */}
          <Form.Item label="Email" name="email">
            <CustomInput placeholder="Enter your email" readOnly />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item label="Phone Number" name="phone">
            <CustomInput type="number" placeholder="Enter your phone number" />
          </Form.Item>

          {/* Submit Button */}
          <CustomButton loading={isLoading} className="w-full">
            Update Information
          </CustomButton>
        </Form>
      </div>
    </div>
  );
};

export default EditInformation;
