import { Link } from "react-router-dom";

const NavBar = () => {
  const links = (
    <>
      <li>
        {" "}
        <Link to='/'>Home</Link>
      </li>
      <li>
        {" "}
        <Link to='/'>Membership</Link>
      </li>
      <li>
        {" "}
        <Link to='/'>Notification icon</Link>
      </li>
      <li>
        {" "}
        <Link to='/'>Join US</Link>
      </li>
      <li>
        {" "}
        <Link to='/'>profile picture</Link>
      </li>
    </>
  );
  return (
    <div className='navbar bg-base-100'>
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
        <a className='btn'>Button</a>
      </div>
    </div>
  );
};

export default NavBar;
