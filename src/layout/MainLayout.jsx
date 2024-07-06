
import { Outlet } from 'react-router-dom';
import Sidebar from '../component/Sidebar/Sidebar';
import Header from '../component/Header/Header';

const MainLayout = () => {
  return (
    <main className='w-full h-screen flex gap-5'>
      <div className='w-full md:w-[20%] '>
        <Sidebar />
      </div>
      <section className='w-full md:w-[80%]'>
        <Header />
        <Outlet />
      </section>
    </main>
  );
};
export default MainLayout;
