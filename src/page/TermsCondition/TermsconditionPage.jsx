import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import CustomButton from "../../utils/CustomButton";
import { useGetTermsConditionQuery } from "../../redux/features/setting/settingApi";
import { Spin } from "antd"; // Importing Spin

const TermsconditionPage = () => {
  const { data: termsConditionsData, isLoading } = useGetTermsConditionQuery();

  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-5">
        <div className="flex gap-4 items-center">
          <Link to="/settings">
            <IoChevronBack className="text-2xl" />
          </Link>
          <h1 className="text-2xl font-semibold">Terms of Conditions</h1>
        </div>
        <Link to={"/settings/edit-terms-conditions"}>
          <CustomButton border>
            <TbEdit className="size-5" />
            <span>Edit</span>
          </CustomButton>
        </Link>
      </div>

      {/* Show Spin loader if data is loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[calc(100vh-120px)]">
          <Spin/>
        </div>
      ) : (
        <div>
          {termsConditionsData &&
            termsConditionsData.map((term) => (
              <p key={term._id} className="text-lg">
                {term.content}
              </p>
            ))}
        </div>
      )}
    </section>
  );
};

export default TermsconditionPage;
