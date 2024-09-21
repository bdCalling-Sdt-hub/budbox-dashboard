import { LiaDonateSolid } from "react-icons/lia"
import { PiCurrencyCircleDollar, PiUsersThree } from "react-icons/pi"
import { RiUserVoiceLine } from "react-icons/ri"

const Status = () => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="flex justify-between items-center p-8 rounded-lg bg-white">
                <div className="size-16 p-3 flex justify-center items-center rounded bg-[#111111] text-[#f7cc50]">
                    <PiCurrencyCircleDollar className="size-8" />
                </div>
                <div className="space-y-2">
                    <h1>Total Earnings</h1>
                    <h1 className="text-center text-3xl font-semibold text-[#222222]">$24.30</h1>
                </div>
            </div>
            <div className="flex justify-between items-center p-8 rounded-lg bg-white">
                <div className="size-16 p-3 flex justify-center items-center rounded bg-[#111111] text-[#f7cc50]">
                    <PiUsersThree className="size-8" />
                </div>
                <div className="space-y-2">
                    <h1>Total User</h1>
                    <h1 className="text-center text-3xl font-semibold text-[#222222]">1200</h1>
                </div>
            </div>
            <div className="flex justify-between items-center p-8 rounded-lg bg-white">
                <div className="size-16 p-3 flex justify-center items-center rounded bg-[#111111] text-[#f7cc50]">
                    <LiaDonateSolid className="size-8" />
                </div>
                <div className="space-y-2">
                    <h1>Total Employee</h1>
                    <h1 className="text-center text-3xl font-semibold text-[#222222]">1200</h1>
                </div>
            </div>
            <div className="flex justify-between items-center p-8 rounded-lg bg-white">
                <div className="size-16 p-3 flex justify-center items-center rounded bg-[#111111] text-[#f7cc50]">
                    <RiUserVoiceLine className="size-6" />
                </div>
                <div className="space-y-2">
                    <h1>Total Manager</h1>
                    <h1 className="text-center text-3xl font-semibold text-[#222222]">1200</h1>
                </div>
            </div>
        </div>
    )
}

export default Status
