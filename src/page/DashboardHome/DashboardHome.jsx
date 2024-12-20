import IncomeGraphChart from "../../component/Main/Dashboard/IncomeGraphChart";
// import Piechart from "../../component/Main/Dashboard/Piechart";
import RecentTransactions from "../../component/Main/Dashboard/RecentTransactions";
import Status from "../../component/Main/Dashboard/Status";
const DashboardHome = () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold py-6">Overview</h1>
      <div className="px-3 pb-5 space-y-5">
        <Status />
        {/* <div className="grid grid-cols-1 md:grid-cols-6 gap-5 ">
          <IncomeGraphChart />
          <Piechart />
        </div> */}
        <IncomeGraphChart />
        <RecentTransactions />
      </div>
    </section>
  );
};

export default DashboardHome;
