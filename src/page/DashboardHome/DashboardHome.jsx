import IncomeGraphChart from "../../component/Main/Dashboard/IncomeGraphChart"
import RecentUser from "../../component/Main/Dashboard/RecentUser"
import Status from "../../component/Main/Dashboard/Status"
import TotalPaymentGraphChart from "../../component/Main/Dashboard/TotalPaymentGraphChart"

const DashboardHome = () => {
    return (
        <section>
            <h1 className="text-xl font-semibold py-6">Overview</h1>
            <div className="px-3 pb-5 space-y-3">
                <Status />
                <IncomeGraphChart />
                <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
                    <TotalPaymentGraphChart />
                    <RecentUser/>
                </div>
            </div>
        </section>
    )
}

export default DashboardHome
