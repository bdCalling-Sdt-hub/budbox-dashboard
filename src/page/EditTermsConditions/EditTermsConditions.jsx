import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "antd";
import JoditEditor from "jodit-react"; // Import Jodit React
import { useEffect, useRef, useState } from "react";
import {
  useAddTermsConditionMutation,
  useGetTermsConditionQuery,
} from "../../redux/features/setting/settingApi";
import { toast } from "sonner";

const EditTermsConditions = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const { data: termsConditionsData, isLoading } = useGetTermsConditionQuery();
  const [editTermsCondition] = useAddTermsConditionMutation();
  const editor = useRef(null); // Jodit Editor ref
  const [content, setContent] = useState(""); // Initialize with an empty string

  useEffect(() => {
    if (!isLoading && termsConditionsData?.[0]?.content) {
      setContent(termsConditionsData[0].content);
    }
  }, [isLoading, termsConditionsData]);

  const handleSubmit = async () => {
    try {
      const res = await editTermsCondition({ content });
      if (res.error) {
        toast.error(res.error.data.message || "Failed to update terms.");
        return;
      }
      if (res.data) {
        toast.success("Terms and Conditions updated successfully");
        navigate("/settings")
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
          <h1 className="text-2xl font-semibold">Edit Terms and Conditions</h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full p-6 rounded-lg shadow-md">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Jodit React for Terms and Conditions Content */}
          <Form.Item>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <JoditEditor
                ref={editor}
                value={content}
                config={{
                  readonly: false,
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

export default EditTermsConditions;
