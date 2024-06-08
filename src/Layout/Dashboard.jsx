import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className='flex gap-6 '>
      <div className='w-64 min-h-screen bg-[#adabab]'>
        <ul className='menu text-white font-medium text-xl'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/myprofile'>MY Profile</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/addpost'>Add Post</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/mypost'>My Post</NavLink>
          </li>
        </ul>
      </div>
      <div className='flex-1  border '>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
