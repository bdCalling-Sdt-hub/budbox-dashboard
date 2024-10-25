import { FaArrowLeftLong } from "react-icons/fa6";
import CustomForm from "../../Form/CustomForm";
import CustomInput from "../../Form/CustomInput";
import CustomSelect from "../../Form/CustomSelect";
import { useState } from "react";
import { Link } from "react-router-dom";
const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];
const AddCategory = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const submit = async (values) => {
    const { categoryName, categoryType } = values;
    console.log(categoryName, categoryType, selectedImage);
  };
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };
  return (
    <section className="w-full px-3">
      <div className="py-6 flex items-center gap-2">
        <Link to="/category">
          <FaArrowLeftLong className="size-5" />
        </Link>
        <h1 className="text-lg  font-semibold">Add new Category</h1>
      </div>
      <CustomForm onSubmit={submit}>
        <CustomInput
          name="categoryName"
          type="text"
          placeholder="Enter category name"
          label={"Category Name"}
          required={true}
        />
        <CustomSelect
          name="categoryType"
          placeholder="Enter category type"
          options={options}
          label="Category Type"
          required={true}
        />
        <div>
          <label htmlFor="categoryImage">
            Upload Image <span className="text-rose-500 ">*</span>
          </label>
          <input
            onChange={handleImageChange}
            className="w-full  px-3 py-2 border border-gray-400 rounded-[2px] outline-none mt-2"
            type="file"
            name="categoryImage"
            id="categoryImage"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#edf2f4]  text-[#4c7e95] py-2 px-4 border border-[#4c7e95] hover:bg-[#4c7e95] hover:text-white transition-all duration-300 mt-5"
        >
          Add Category
        </button>
      </CustomForm>
    </section>
  );
};

export default AddCategory;
