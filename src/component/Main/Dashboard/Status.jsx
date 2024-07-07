import { LiaDonateSolid } from "react-icons/lia"
import { PiCurrencyCircleDollar, PiUsersThree } from "react-icons/pi"
import { RiUserVoiceLine } from "react-icons/ri"

const Status = () => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="flex justify-between items-center border p-2 rounded">
                <div className="size-12 p-2 flex justify-center items-center rounded bg-[#4c7e95] text-white">
                    <PiCurrencyCircleDollar className="size-8" />
                </div>
                <div className="space-y-2">
                    <h1>Total Earnings</h1>
                    <h1 className="text-center text-3xl font-semibold text-[#222222]">$24.30</h1>
                </div>
            </div>
            <div className="flex justify-between items-center border p-2 rounded">
                <div className="size-12 p-2 flex justify-center items-center rounded bg-[#1bc5bd] text-white">
                    <PiUsersThree className="size-8" />
                </div>
                <div className="space-y-2">
                    <h1>Total User</h1>
                    <h1 className="text-center text-3xl font-semibold text-[#222222]">1200</h1>
                </div>
            </div>
            <div className="flex justify-between items-center border p-2 rounded">
                <div className="size-12 p-2 flex justify-center items-center rounded bg-[#1bc5bd] text-white">
                    <LiaDonateSolid className="size-8" />
                </div>
                <div className="space-y-2">
                    <h1>Total Donation  </h1>
                    <h1 className="text-center text-3xl font-semibold text-[#222222]">1200</h1>
                </div>
            </div>
            <div className="flex justify-between items-center border p-2 rounded">
                <div className="size-12 p-2 flex justify-center items-center rounded bg-[#5f5cf1] text-white">
                    <RiUserVoiceLine className="size-6" />
                </div>
                <div className="space-y-2">
                    <h1>Total Services</h1>
                    <h1 className="text-center text-3xl font-semibold text-[#222222]">1200</h1>
                </div>
            </div>
        </div>
    )
}

export default Status
