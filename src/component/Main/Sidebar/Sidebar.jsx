import { IoIosLogOut } from "react-icons/io"
import { IoCopyOutline, IoSettingsOutline } from "react-icons/io5"
import { LuLayoutDashboard } from "react-icons/lu"
import { PiCurrencyCircleDollar, PiUsersThree } from "react-icons/pi"
import { NavLink, useNavigate } from "react-router-dom"

const sidebarItems = [
    {
        path: '/',
        name: 'Dashboard',
        icon: <LuLayoutDashboard className="size-6" />
    },
    {
        path: '/users',
        name: 'Users',
        icon: <PiUsersThree className="size-6" />
    },
    {
        path: '/category',
        name: 'Category',
        icon: <IoCopyOutline className="size-6" />
    },
    {
        path: '/earnings',
        name: 'Earnings',
        icon: <PiCurrencyCircleDollar className="size-6" />
    },
    {
        path: '/settings',
        name: 'Settings',
        icon: <IoSettingsOutline className="size-6" />
    }
]
const Sidebar = () => {
    const navigate = useNavigate()
    const user = {
        name: 'Md Rakib Islam',
        email: 'rakib.com',
        image: 'https://i.postimg.cc/0QZmYnLd/rakib.png'

    }
    return (
        <div className='w- h-screen bg-[#4c7e95] sticky top-0 left-0'>
            <div className="flex flex-col justify-center items-center pt-5 gap-2 text-white">
                <img src={user.image} alt={user.name} className='rounded-full size-14 ring-4 ring-white' />
                <h1 className="font-semibold uppercase">{user.name}</h1>
                <span className="text-sm">FOR - GREAT - PARENTS</span>
            </div>
            <hr className="mb-5" />
            <ul className="w-full flex flex-col gap-3">
                {
                    sidebarItems.map(item => <NavLink key={item.name} to={item.path} className={({ isActive }) => isActive ? 'bg-white p-3 flex items-center gap-2 text-[#4c7e95]' : 'p-3 flex items-center gap-2 text-white'}>
                        <h1 className="size-7"> {item?.icon}</h1>
                        <span>{item.name}</span>
                    </NavLink>)
                }

            </ul>
            <button onClick={()=>navigate('auth')} className="flex items-center gap-2 p-3 text-white mt-16">
                <IoIosLogOut className="size-6" />
                <span>Logout</span>
            </button>
        </div>
    )
}

export default Sidebar
