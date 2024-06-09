import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  // To do : make admin from db
  const isAdmin = true;
  return (
    <div className='flex gap-6 '>
      <div className='w-64 min-h-screen bg-[#adabab]'>
        <ul className='menu text-white font-medium text-xl'>
          {isAdmin ? (
            <>
              <li>
                <NavLink to='/'> Admin Profile</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/users'>Manage Users</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/addpost'>Add Post</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/mypost'>My Post</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to='/'> user home</NavLink>
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
            </>
          )}

          <div className='divider outline-white outline-2 '></div>
          {/* common navlinks */}
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/'>Notification</NavLink>
          </li>

          <li>
            <button className='btn btn-sm'>Logout</button>
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
