import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button, Form } from "antd";
import JoditEditor from "jodit-react"; // Import Jodit React
import { useRef, useState } from "react";

const EditAboutUs = () => {
  const [form] = Form.useForm();
  const editor = useRef(null); // Jodit Editor ref
  const [content, setContent] = useState(
    "<p>Enter your 'About Us' content here.</p>"
  ); // Default content for the About Us section

  const handleSubmit = () => {
    console.log("Updated About Us Content:", content);
    // Handle form submission, e.g., update the About Us section in the backend
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
          <Form.Item name="content" initialValue={content}>
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
          </Form.Item>

          {/* Update Button */}
          <div className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#C90739] text-white px-5 py-2 rounded-md"
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
