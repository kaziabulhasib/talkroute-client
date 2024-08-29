import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { MdNotificationAdd } from "react-icons/md";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Notimodal from "../../../Components/notimodal/Notimodal";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { data: announcements = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/announcements");
      return res.data;
    },
  });
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
      {/*
      <li>
        <button className='btn btn-sm'>
          <MdNotificationAdd className='text-xl' />
          <div className='badge badge-secondary '> {announcements.length}</div>
        </button>
      </li>
  */}
      <li>
        <Notimodal announcements={announcements} />
      </li>
    </>
  );
  return (
    <div className='navbar bg-gray-100 lg:px-36 fixed top-0 z-10 opacity-90  shadow'>
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

        <Link to='/' className='flex justify-center items-center gap-4 '>
          <img src='/logo.png' alt='' className='w-12 h-12 ' />
          <p className='text-2xl font-bold'>TalkRoute</p>
        </Link>
      </div>
      <div className='navbar-center  hidden lg:flex lg:items-center '>
        <ul className='menu menu-horizontal font-medium items-center  text-xl px-1 sm:6 md:gap-8 lg:gap-24'>
          {links}
        </ul>
      </div>

      <div className='navbar-end ml-6'>
        {/* <a className='btn'>Logout</a> */}
        {user ? (
          <>
            <div className='dropdown dropdown-end mr-8  '>
              <label tabIndex={0}>
                <div className=''>
                  <img
                    referrerPolicy='no-referrer'
                    alt='User Profile Picture'
                    className='w-14 h-14 rounded-full border-2 bg-white p-1 border-slate-600'
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
                  <h1 className=' text-[18px] my-2 text-white ml-6 text-center font-medium'>
                    {user?.displayName || "user name not found"}
                  </h1>
                  {/* Dashboard  */}
                  <Link to='/dashboard/myprofile' className='btn btn-sm mb-2'>
                    Dashboard
                  </Link>
                  {/* log out   */}
                  <Link onClick={handleLogout} className='btn btn-sm'>
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
              className='btn btn-sm bg-gray-700 hover:text-gray-900 text-white hover:bg-slate-300 '>
              Join US
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
