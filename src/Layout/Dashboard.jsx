import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  //  make admin from db
  const [isAdmin] = useAdmin();

  const handleLogout = () => {
    logOut()
      .then((result) => {
        console.log(result);
        navigate("/register");
        toast.success("Logout Successful");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className='flex lg:gap-6 gap-2 '>
      <div className='lg:w-64 w-40 pt-8 min-h-screen bg-[#27374D]'>
        <ul className='menu text-white font-medium lg:text-xl'>
          {isAdmin ? (
            <>
              <li>
                <NavLink to='/dashboard/adminprofile'> Admin Profile</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/users'>Manage Users</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/activities'>Activities</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/makeannouncement'>Announcement</NavLink>
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
              {/* <li>
                <NavLink to='/'> user home</NavLink>
              </li> */}
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
          {/* <li>
            <NavLink to='/'>Notification</NavLink>
          </li> */}

          <li>
            <button onClick={handleLogout} className='btn btn-sm'>
              Logout
            </button>
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
