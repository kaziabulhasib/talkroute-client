import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// const from = location.state?.from?.pathname || "/";
console.log("state in the location:", location.state);

const Login = () => {
  // const { signInWithGoogle, signIn } = useAuth();
  const { signInWithGoogle, signIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  // login
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // const user = { email, password };
    // console.log(user);
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);

      toast.success("Signin Successful");
      navigate(location?.state ? location?.state : "/");
    });
  };

  //
  const handleGoogleLogin = () => {
    signInWithGoogle().then((result) => {
      console.log(result.user);
      const userINfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userINfo).then((res) => {
        console.log(res.data);
        navigate(location?.pathname ? location?.pathname : "/");
        toast.success("Login Successful!");
      });
    });
  };
  return (
    <div>
      <Helmet>
        <title>TalkRoute | Login</title>
      </Helmet>
      <div className='hero min-h-screen  '>
        <div className='hero-content flex-col lg:flex-row gap-24  '>
          <div className='text-center lg:text-left  '>
            <img src='/logo.png' className='w-full' alt='' />
          </div>
          <div className='card shrink-0 lg:w-1/2 w-full  shadow-2xl bg-base-100'>
            <form onSubmit={handleLogin} className='card-body'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  name='email'
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
                  name='password'
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
                Create Account
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
              <h1 className='text-[18px] font-medium pr-6'>
                Login With Google.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
