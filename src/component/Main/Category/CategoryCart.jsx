import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const CategoryCart = ({ category }) => {
  const { name, image } = category;
  return (
    <div className="w-full group">
      <div className="relative overflow-hidden  rounded-md">
        <img src={image} alt={name} className="w-full h-52 object-cover transition-transform transform group-hover:scale-105 rounded-md cursor-pointer " />
        <div className="absolute left-0 right-0 bottom-0  opacity-0 group-hover:opacity-80 transition-all duration-300 text-center bg-white bg-opacity-0 group-hover:bg-opacity-80">
          <h1 className="py-3">{name}</h1>
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <button className='px-8 py-1 bg-[#edf2f4]  text-[#4c7e95]  border border-[#4c7e95] rounded'>Delete</button>
        <Link to={`/category/edit-category/${123456}`}><button className='px-10 py-1 bg-[#4c7e95] text-white rounded'>Edit</button></Link>
      </div>
    </div>
  );
};

export default CategoryCart;
