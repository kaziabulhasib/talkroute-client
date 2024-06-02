import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { signInWithGoogle } = useAuth();

  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      // navigate(from, { replace: true });
      navigate("/");
      toast.success("Logged in Successfully");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  return (
    <div className='hero min-h-screen border '>
      <div className='hero-content flex-col lg:flex-row gap-24  '>
        <div className='text-center lg:text-left  '>
          <img src='/public/logo.png' className='w-full' alt='' />
        </div>
        <div className='card shrink-0 w-1/2 shadow-2xl bg-base-100'>
          <form className='card-body'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                placeholder='email'
                className='input input-bordered'
                required
              />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type='password'
                placeholder='password'
                className='input input-bordered'
                required
              />
              <label className='label'></label>
            </div>
            <div className='form-control mt-6'>
              <button className='btn btn-active'>Login</button>
            </div>
          </form>
          <p className='text-center mb-4 text-red-600'>
            <small>New User? </small>
            <Link
              to='/register'
              className='hover:underline hover:text-green-700'>
              Create New Account
            </Link>
          </p>
          <p className='text-xl text-center font-medium'>
            -------------Login With-------------
          </p>
          <div
            onClick={handleGoogleLogin}
            className='flex justify-center items-center gap-4 bg-gray-600 text-white  hover:bg-white hover:text-black border border-gray-600 w-full mx-auto p-1 cursor-pointer mt-4 '>
            <h1 className='text-xl bg-white p-2'>
              <FcGoogle />
            </h1>
            <h1 className='text-[18px] font-medium pr-6'>Login With Google.</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
