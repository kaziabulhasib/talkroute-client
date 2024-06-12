import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeAnnouncement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleAnnouncement = async (e) => {
    e.preventDefault();
    const form = e.target;

    const authorName = user.displayName;
    const authorEmail = user.email;
    const authorImage = user.photoURL;
    const title = form.title.value;
    const description = form.description.value;

    const announcement = {
      authorName,
      authorEmail,
      authorImage,
      title,
      description,
    };
    console.log(announcement);
    form.reset();

    // send announcement data to database
    const postRes = await axiosSecure.post("/announcements", announcement);
    console.log(postRes);
    if (postRes.data.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Announcement added successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>TalkRoute | Announcement</title>
      </Helmet>
      <div>
        <h1 className='lg:text-3xl text-xl text-center font-semibold my-16 text-gray-700'>
          Post an Announcement
        </h1>
        <form
          onSubmit={handleAnnouncement}
          className='p-8 my-6 max-w-screen-sm mx-auto shadow-lg rounded-lg'>
          <div>
            <img
              className='w-16 h-16 rounded-full'
              src={
                user?.photoURL ||
                "https://i.ibb.co/K6n8jh8/Profile-Male-PNG.png"
              }
              alt=''
            />
          </div>
          <label className='form-control w-full my-4 '>
            <span className='label-text my-4 text-xl font-semibold'>Title</span>
            <input
              type='text'
              placeholder='Title'
              className='input input-bordered w-full '
              name='title'
            />
          </label>

          <div className='flex flex-col lg:flex-row gap-4 '>
            {/* Name */}
            <label className='form-control w-full my-4 '>
              <span className='label-text my-4 text-xl font-semibold'>
                Author Name
              </span>
              <input
                defaultValue={user?.displayName}
                disabled
                type='text'
                className='input input-bordered w-full '
                name='authorName'
              />
            </label>

            {/* Email */}
            <label className='form-control w-full my-4 '>
              <span className='label-text my-4 text-xl font-semibold'>
                Author Email
              </span>
              <input
                defaultValue={user?.email}
                disabled
                type='text'
                className='input input-bordered w-full '
                name='authorEmail'
              />
            </label>
          </div>
          {/* Text area */}
          <label className='form-control w-full my-4 '>
            <span className='label-text my-4 text-xl font-semibold'>
              Description
            </span>
            <textarea
              placeholder='Description'
              className='textarea textarea-bordered textarea-lg w-full '
              name='description'></textarea>
          </label>

          <button className='btn bg-gray-600 hover:bg-gray-700 text-white'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
