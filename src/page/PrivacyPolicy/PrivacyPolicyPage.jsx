import { IoChevronBack } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import CustomButton from "../../utils/CustomButton";
import { useGetPrivacyPolicyQuery } from "../../redux/features/setting/settingApi";
import { Spin } from "antd"; // Importing Spin

const PrivacyPolicyPage = () => {
  const { data: privacyPolicyData, isLoading } = useGetPrivacyPolicyQuery();

  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-5">
        <div className="flex gap-4 items-center">
          <Link to="/settings">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Privacy Policy</h1>
        </div>
        <Link to={"/settings/edit-privacy-policy"}>
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
          {privacyPolicyData &&
            privacyPolicyData.map((privacy) => (
              <div
                key={privacy._id}
                className="text-lg"
                dangerouslySetInnerHTML={{ __html: privacy.content }} // Render raw HTML
              ></div>
            ))}
        </div>
      )}
    </section>
  );
};

export default PrivacyPolicyPage;
