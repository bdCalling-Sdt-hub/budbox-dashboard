import { FaPlus } from "react-icons/fa"
import CategoryCart from "./CategoryCart"
import { Link } from "react-router-dom"

const categoryData = [
  {
    name: 'Concert',
    image: 'https://i.postimg.cc/G2pFgc96/category.png'
  },
  {
    name: 'Game',
    image: 'https://i.postimg.cc/vmbL97yY/category2.png'
  },
  {
    name: 'Sports',
    image: 'https://i.postimg.cc/W1R7pLfJ/category3.png'
  }
]
const Category = () => {
  return (
    <section>
      <div className="w-full flex justify-end items-center px-3 py-6">
        <Link to={`/category/add-category/123456`}><button className="px-4 py-2 bg-[#4c7e95] text-white flex justify-center items-center gap-1 rounded"><FaPlus />
          Add Category
        </button></Link>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
        {
          categoryData.map((item, index) => {
            return <CategoryCart key={index + 1} category={item} />
          })
        }
      </div>
    </section>
  )
}

export default Category
