import { Form } from "antd";
import { useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../redux/features/profile/profileApi";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";
import { imageBaseUrl } from "../../../config/imageBaseUrl";
import { useSelector } from "react-redux";

const EditInformation = () => {
  const { user: authUser } = useSelector((state) => state.auth);
  const { data: user } = useGetUserQuery(authUser?.id, {
    skip: !authUser,
  });
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [updateUser, { isLoading }] = useUpdateUserMutation(); // Mutation for updating user

  useEffect(() => {
    if (user) {
      // Set initial values from the user object
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, form]);

  const onFinish = async (values) => {
    try {
      const response = await updateUser(values);
      if (response.error) {
        toast.error(response.error.data.message);
      }
      if (response.data) {
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
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 gap-8 mt-10">
        {/* Profile Picture */}
        <div className="w-full h-96 border col-span-full md:col-span-3 rounded-lg flex justify-center items-center flex-col gap-5">
          <img
            className="size-32 rounded-full mx-auto"
            src={`${imageBaseUrl}${user?.image?.url}`}
            alt=""
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
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <CustomInput placeholder="Enter your full name" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <CustomInput placeholder="Enter your email" />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
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
