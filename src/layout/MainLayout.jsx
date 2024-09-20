
import { Outlet } from 'react-router-dom';
import Sidebar from '../component/Main/Sidebar/Sidebar';
import Header from '../component/Main/Header/Header';

const MainLayout = () => {
  return (
    <main className='w-full h-full flex'>
      <div className='w-full md:w-[20%] sticky top-0 left-0 '>
        <Sidebar />
      </div>
      <section className='w-full md:w-[80%] bg-[#f7f9fb] px-5'>
        <Header />
        <Outlet />
      </section>
    </main>
  );
};
export default MainLayout;
