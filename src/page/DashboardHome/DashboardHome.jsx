import IncomeGraphChart from "./IncomeGraphChart"
import RecentUser from "./RecentUser"
import Status from "./Status"
import TotalPaymentGraphChart from "./TotalPaymentGraphChart"

const DashboardHome = () => {
    return (
        <section className="py-5">
            <h1 className="text-xl font-semibold py-5">Overview</h1>
            <div className="px-3 space-y-3">
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
