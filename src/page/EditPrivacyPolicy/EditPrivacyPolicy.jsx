import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react"; // Import Jodit React
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "antd";
import {
  useGetPrivacyPolicyQuery,
  useAddPrivacyPolicyMutation,
} from "../../redux/features/setting/settingApi";
import { toast } from "sonner";

const EditPrivacyPolicy = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data: privacyPolicyData, isLoading } = useGetPrivacyPolicyQuery();
  const [addPrivacy] = useAddPrivacyPolicyMutation();
  const editor = useRef(null); // Jodit Editor ref
  const [content, setContent] = useState(""); // Initialize with an empty string

  // Populate content when data is fetched
  useEffect(() => {
    if (!isLoading && privacyPolicyData?.[0]?.content) {
      setContent(privacyPolicyData[0].content);
    }
  }, [isLoading, privacyPolicyData]);

  const handleSubmit = async () => {
    try {
      const res = await addPrivacy({ content });
      if (res.error) {
        toast.error(
          res.error.data.message || "Failed to update privacy policy."
        );
        return;
      }
      if (res.data) {
        toast.success("Privacy Policy updated successfully");
        navigate("/settings");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <section className="w-full h-full min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center py-5">
        <div className="flex gap-4 items-center">
          <Link to="/settings">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Edit Privacy Policy</h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full p-6 rounded-lg shadow-md">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Jodit React Editor for Privacy Policy Content */}
          <Form.Item>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <JoditEditor
                ref={editor}
                value={content}
                config={{
                  readonly: false, // Enable editing
                  height: 300,
                  buttons: [
                    "bold",
                    "italic",
                    "underline",
                    "strikethrough",
                    "|",
                    "ul",
                    "ol",
                    "outdent",
                    "indent",
                    "|",
                    "font",
                    "fontsize",
                    "paragraph",
                    "|",
                    "link",
                    "image",
                    "video",
                    "|",
                    "align",
                    "undo",
                    "redo",
                    "hr",
                    "copyformat",
                  ],
                }}
                onBlur={(newContent) => setContent(newContent)} // Save content on blur
                tabIndex={1}
              />
            )}
          </Form.Item>

          {/* Update Button */}
          <div className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#C90739] text-white px-5 py-2 rounded-md"
              disabled={isLoading} // Disable button while loading
            >
              Update
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default EditPrivacyPolicy;
