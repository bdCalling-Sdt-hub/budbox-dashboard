import { PiCurrencyCircleDollar, PiUsersThree } from "react-icons/pi";
import { useGetDashboardStatusQuery } from "../../../redux/features/dashboard/dashboardApi";

const Status = () => {
    const {data} = useGetDashboardStatusQuery();
    console.log(data)
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
      <div className="flex justify-between items-center p-8 rounded-lg bg-white shadow-md">
        <div className="size-16 p-3 flex justify-center items-center rounded bg-[#111111] text-[#f7cc50]">
          <PiCurrencyCircleDollar className="size-8" />
        </div>
        <div className="space-y-2">
          <h1>Total Earnings</h1>
          <h1 className="text-center text-3xl font-semibold text-[#222222]">
            ${data?.totalEarnings}
          </h1>
        </div>
      </div>
      <div className="flex justify-between items-center p-8 rounded-lg bg-white shadow-md">
        <div className="size-16 p-3 flex justify-center items-center rounded bg-[#111111] text-[#f7cc50]">
          <PiUsersThree className="size-8" />
        </div>
        <div className="space-y-2">
          <h1>Total User</h1>
          <h1 className="text-center text-3xl font-semibold text-[#222222]">
           {data?.totalUser}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Status;
