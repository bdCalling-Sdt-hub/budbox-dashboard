import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import JoditEditor from "jodit-react"; // Import Jodit React
import { useRef, useState } from "react";
import CustomButton from "../../utils/CustomButton";
import { Form } from "antd";

const EditPrivacyPolicy = () => {
  const [form] = Form.useForm();
  const editor = useRef(null); // Jodit Editor ref
  const [content, setContent] = useState(
    "<h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at adipiscing proin et.</h1>"
  ); // Default content for the privacy policy

  const handleSubmit = () => {
    console.log("Updated Privacy Policy Content:", content);
    // Handle form submission, e.g., update the privacy policy in the backend
  };

  return (
    <section className="w-full h-full min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center py-5">
        <div className="flex gap-4 items-center">
          <Link to="/settings">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Privacy Policy</h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full p-6 rounded-lg shadow-md">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Jodit React Editor for Privacy Policy Content */}
          <Form.Item name="content" initialValue={content}>
            <JoditEditor
              ref={editor}
              value={content}
              config={{
                readonly: false, // Enable editing
                toolbarAdaptive: false,
                toolbarSticky: false,
                height: 300,
                buttons: [
                  "bold",
                  "italic",
                  "underline",
                  "strikethrough",
                  "eraser",
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
                  "image",
                  "link",
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
          </Form.Item>

          {/* Update Button */}
          <div className="w-full flex justify-end">
            <CustomButton border>Update</CustomButton>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default EditPrivacyPolicy;
