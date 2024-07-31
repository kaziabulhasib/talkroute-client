import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <section className='py-12 mt-16  min-h-screen text-gray-900'>
        <div className='container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48'>
          <h1 className='text-9xl text-red-500 font-bold leading-none text-center'>
            404
          </h1>
          {/* <p className='text-xl w-2/3 mx-auto font-medium  rounded-sm py-4  lg:px-16 '>
            Uh oh! Looks like you've reached a broken page. The content you
            requested might have moved or simply be missing. Don't worry, we've
            all been there. Check out the url to find what you're looking for,
            or head back to the homepage to get started fresh.
          </p> */}
          <p className='text-6xl text-center w-2/3 mx-auto font-bold  rounded-sm py-4  lg:px-16 '>
            Not Found
          </p>
          <p className='text-4xl text-center w-2/3 mx-auto font-medium  rounded-sm py-4  lg:px-16 '>
            The content you requested might have moved or simply be missing.
          </p>
          <div className='flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8 '>
            <Link
              to='/'
              className='px-8 py-3 text-lg font-normal border rounded bg-gray-700 hover:bg-gray-800 text-gray-50 border-gray-700'>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error;
