import { FaIdBadge } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useMyPost from "../../../hooks/useMyPost";
import { useNavigate } from "react-router-dom";
import PostCard from "../../../Components/PostCard/PostCard";
import { Helmet } from "react-helmet";

const MyProfile = () => {
  const { user } = useAuth();
  const [posts] = useMyPost();

  //
  const navigate = useNavigate();

  // date format
  const formatPostTime = (datetimeStr) => {
    const date = new Date(datetimeStr);
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate.replace(",", "");
  };

  // handle post dettails
  // const handleClick = (id) => {
  //   console.log(id);
  //   navigate(`/posts/${id}`);
  // };
  return (
    <div>
      <Helmet>
        <title>TalkRoute | MyProfile</title>
      </Helmet>
      <div
        className='flex flex-col mx-auto lg:w-[90%] w-full lg:p-6 p-1 space-y-6 overflow-hidden  rounded-lg shadow-md mt-8 min-h-[calc\(100vh-300px\)]
'>
        <div className='flex flex-col lg:flex-row justify-evenly lg:w-2/3  lg:mx-auto  items-center border lg:py-4 rounded-lg'>
          <img
            alt=''
            src={user.photoURL}
            className='object-cover w-16 h-16 rounded-full shadow '
          />
          <h1 className='text-xl font-medium '>{user.displayName}</h1>
          <h2>{user.email}</h2>
          <p className='text-4xl'>
            <FaIdBadge></FaIdBadge>
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 justify-around py-36'>
          {posts.slice(0, 3).map((post) => (
            // <div
            //   key={post._id}
            //   onClick={() => handleClick(post._id)}
            //   className='py-8 px-16 mx-auto  border rounded-lg hover:cursor-pointer'>
            //   <article className='space-y-8 '>
            //     <div className='space-y-6'>
            //       {/* post title */}
            //       <h1 className='text-xl font-bold md:text-2xl text-left'>
            //         {post.postTitle}
            //       </h1>
            //       <div className='flex flex-col gap-6 space-x-4 items-start justify-between w-full md:flex-row md:items-center '>
            //         {/* Author image */}
            //         <div className='flex items-center md:space-x-2'>
            //           <img
            //             src={post.authorImage}
            //             alt=''
            //             className='w-12 h-12 border rounded-full '
            //           />
            //           {/* Time */}
            //           <p className='text-sm'>
            //             • {formatPostTime(post.postTime)}
            //           </p>
            //         </div>
            //         {/* votes & comments count */}
            //         <p className='flex-shrink-0 mt-3 text-sm md:mt-0'>
            //           • {0} comments • {post.upVote + post.downVote} votes
            //         </p>
            //       </div>
            //     </div>
            //   </article>
            //   <div>
            //     <h1>#{post.postTag}</h1>
            //   </div>
            // </div>
            <PostCard key={post.id} post={post}></PostCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
