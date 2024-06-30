import { FaIdBadge } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useMyPost from "../../../hooks/useMyPost";
import { useNavigate } from "react-router-dom";
import PostCard from "../../../Components/PostCard/PostCard";
import { Helmet } from "react-helmet";
import { LuBadgeCheck, LuBadgeDollarSign } from "react-icons/lu";
import { useMembership } from "../../../providers/MembershipContext";

const MyProfile = () => {
  const { user } = useAuth();
  const [posts] = useMyPost();
  const { isMember } = useMembership();

  const navigate = useNavigate();

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

  return (
    <div>
      <Helmet>
        <title>TalkRoute | MyProfile</title>
      </Helmet>
      <div className='flex flex-col mx-auto lg:w-[90%] w-full lg:p-6 p-1 space-y-6 overflow-hidden rounded-lg shadow-md mt-8 min-h-[calc(100vh-300px)]'>
        <div className='flex flex-col lg:flex-row justify-evenly lg:w-2/3 lg:mx-auto items-center border lg:py-4 rounded-lg'>
          <img
            alt=''
            src={user.photoURL}
            className='object-cover w-16 h-16 rounded-full shadow'
          />
          <h1 className='text-xl font-medium'>{user.displayName}</h1>
          <h2>{user.email}</h2>
          <p className='text-4xl'>
            {isMember ? <LuBadgeDollarSign /> : <LuBadgeCheck />}
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 justify-around py-36'>
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.id} post={post}></PostCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
