import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className='flex '>
      <div className='w-64 h-full bg-slate-400'>
        <ul className='menu'>
          <li>
            <NavLink to='/dashboard/myprofile'>MY Profile</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/addpost'>Add New Post</NavLink>
          </li>
        </ul>
      </div>
      <div>
        <Outlet className='flex-1'></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
