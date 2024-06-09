import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Membership = () => {
  return (
    <div>
      <Helmet>
        <title>TalkRoute | MemberShip</title>
      </Helmet>
      <div>
        <section className='py-12 mt-16 bg-gray-100 text-gray-900'>
          <div className='container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48'>
            <h1 className='text-5xl font-bold leading-none text-center'>
              Become Member Now
            </h1>
            <p className='text-xl w-2/3 mx-auto font-medium border rounded-sm py-4  px-16 '>
              Love to hear your thoughts! Become a member for just $5 a month
              and unlock unlimited posting. Free users get 5 posts, but for
              in-depth discussions and sharing your full story, a membership is
              the way to go!
            </p>
            <div className='flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8 '>
              <Link
                to='/payment'
                className='px-8 py-3 text-lg font-semibold rounded bg-violet-600 hover:bg-violet-800 text-gray-50'>
                Pay Membership Fee
              </Link>
              <Link
                to='/'
                className='px-8 py-3 text-lg font-normal border rounded bg-gray-700 hover:bg-gray-800 text-gray-50 border-gray-700'>
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Membership;
