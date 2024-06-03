import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut()
      .then((result) => {
        console.log(result);
        navigate("/register");
        toast.success("Logout Successful");
      })
      .catch((error) => console.log(error));
  };
  const links = (
    <>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/membership'>Membership</Link>
      </li>
      <li>
        <Link to='/'>Notification icon</Link>
      </li>
      <li>
        <Link to='/addpost'>Add Post</Link>
      </li>
    </>
  );
  return (
    <div className='navbar bg-base-100 px-36'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
            {links}
          </ul>
        </div>

        <div className='flex justify-center items-center gap-4 btn btn-ghost'>
          <img src='/logo.png' alt='' className='w-12 h-12 ' />
          <p className='text-2xl font-bold'>TalkRoute</p>
        </div>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>{links}</ul>
      </div>

      <div className='navbar-end'>
        {/* <a className='btn'>Logout</a> */}
        {user ? (
          <>
            <div className='dropdown dropdown-end mr-8  '>
              <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                <div className=''>
                  <img
                    className='w-16 h-16 rounded-full border-2 bg-white border-gray-900'
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/K6n8jh8/Profile-Male-PNG.png"
                    }
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow rounded-box w-52 bg-gray-700 '>
                <li>
                  <h1 className='text-xl text-white ml-6 text-center font-bold'>
                    {user?.displayName || "user name not found"}
                  </h1>
                  {/* Dashboard  */}
                  <Link to='/dashboard' className='btn mb-2'>
                    Dashboard
                  </Link>
                  {/* log out   */}
                  <Link onClick={handleLogout} className='btn'>
                    Log Out
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link
              to='/login'
              className='btn btn-sm btn-primary text-slate-200 hover:text-slate-500 '>
              Join US
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
