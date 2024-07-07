
import { Outlet } from 'react-router-dom';
import Sidebar from '../component/Sidebar/Sidebar';
import Header from '../component/Header/Header';

const MainLayout = () => {
  return (
    <main className='w-full h-full flex gap-5'>
      <div className='w-full md:w-[20%] sticky top-0 left-0 '>
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
