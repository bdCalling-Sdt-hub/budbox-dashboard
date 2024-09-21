import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
const sampleItems = [
  {
    name: "Stylish Backpack",
    description: "A versatile and stylish backpack for everyday use.",
    price: 49.99,
    image: "https://i.postimg.cc/G2pFgc96/category.png",
  },
  {
    name: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones for immersive sound.",
    price: 89.99,
    image: "https://i.postimg.cc/G2pFgc96/category.png",
  },
  {
    name: "Smartwatch",
    description:
      "Track your fitness and stay connected with this sleek smartwatch.",
    price: 199.99,
    image: "https://i.postimg.cc/G2pFgc96/category.png",
  },
  {
    name: "Leather Wallet",
    description: "Genuine leather wallet with multiple card slots.",
    price: 39.99,
    image: "https://i.postimg.cc/G2pFgc96/category.png",
  },
  {
    name: "Coffee Maker",
    description:
      "Brew your favorite coffee at home with this easy-to-use machine.",
    price: 99.99,
    image: "https://i.postimg.cc/G2pFgc96/category.png",
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with excellent sound quality.",
    price: 59.99,
    image: "https://i.postimg.cc/G2pFgc96/category.png",
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat for comfort during workouts.",
    price: 29.99,
    image: "https://i.postimg.cc/G2pFgc96/category.png",
  },
  {
    name: "LED Desk Lamp",
    description: "Adjustable LED desk lamp with multiple brightness settings.",
    price: 24.99,
    image: "https://i.postimg.cc/G2pFgc96/category.png",
  },
  {
    name: "Portable Charger",
    description: "High-capacity portable charger for your devices.",
    price: 34.99,
    image: "https://i.postimg.cc/G2pFgc96/category.png",
  },
  {
    name: "Fitness Tracker",
    description: "Monitor your health and fitness goals with this tracker.",
    price: 49.99,
    image: "https://i.postimg.cc/G2pFgc96/category.png",
  },
];

const Items = () => {
  return (
    <section >
      <div className="w-full flex justify-between items-center py-6">
        <h1 className="text-xl font-semibold ">Items</h1>
        <Link to={`/items/add-item`}>
          <button className="px-8 py-2 bg-[#111111] text-white flex justify-center items-center gap-1 rounded text-sm">
            <FaPlus />
            Add Item
          </button>
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5 pb-5">
        {sampleItems.map((item, i) => (
          <ItemCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Items;
