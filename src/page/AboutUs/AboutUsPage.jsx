import { Spin } from "antd"; // Importing Spin
import { IoChevronBack } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useGetAboutUsQuery } from "../../redux/features/setting/settingApi";
import CustomButton from "../../utils/CustomButton";

const AboutUsPage = () => {
  const { data: aboutUsData, isLoading } = useGetAboutUsQuery();

  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-5">
        <div className="flex gap-4 items-center">
          <Link to="/settings">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">About Us</h1>
        </div>
        <Link to={"/settings/edit-about-us"}>
          <CustomButton border>
            <TbEdit className="size-5" />
            <span>Edit</span>
          </CustomButton>
        </Link>
      </div>

      {/* Show Spin loader if data is loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[calc(100vh-120px)]">
          <Spin />
        </div>
      ) : (
        <div className="px-5 pb-8">
          {aboutUsData &&
            aboutUsData.map((about) => (
              <div
                key={about._id}
                className="text-lg"
                dangerouslySetInnerHTML={{ __html: about.content }} // Rendering raw HTML
              ></div>
            ))}
        </div>
      )}
    </section>
  );
};

export default AboutUsPage;
