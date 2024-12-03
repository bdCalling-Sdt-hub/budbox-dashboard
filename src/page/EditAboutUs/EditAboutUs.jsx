import { Button, Form } from "antd";
import JoditEditor from "jodit-react"; // Import Jodit React
import { useEffect, useRef, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useAddAboutUsMutation,
  useGetAboutUsQuery,
} from "../../redux/features/setting/settingApi";

const EditAboutUs = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const editor = useRef(null); // Jodit Editor ref
  const [content, setContent] = useState(
    "<p>Enter your 'About Us' content here.</p>"
  );

  const { data: aboutUsData, isLoading } = useGetAboutUsQuery(); // Fetch existing About Us data
  const [editAboutUs] = useAddAboutUsMutation(); // Mutation for updating About Us

  useEffect(() => {
    if (!isLoading && aboutUsData?.[0]?.content) {
      setContent(aboutUsData[0].content);
    }
  }, [isLoading, aboutUsData]);

  const handleSubmit = async () => {
    try {
      const res = await editAboutUs({ content });
      if (res.error) {
        toast.error(res.error.data.message || "Failed to update About Us.");
        return;
      }
      if (res.data) {
        toast.success("About Us updated successfully");
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
          <h1 className="text-2xl font-semibold">Edit About Us</h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full p-6 rounded-lg shadow-md">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Jodit React for About Us Content */}
          <Form.Item>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <JoditEditor
                ref={editor}
                value={content}
                config={{
                  readonly: false, // Enable editing
                  height: 300, // Editor height
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
                tabIndex={1} // Tab index for the editor
              />
            )}
          </Form.Item>

          {/* Update Button */}
          <div className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-yellow-500 text-white px-5 py-2 rounded-md"
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

export default EditAboutUs;
