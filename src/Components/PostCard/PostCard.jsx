import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const {
    _id,
    postTitle,
    authorName,
    authorEmail,
    authorImage,
    postDescription,
    postTag,
    upVote,
    downVote,
    postTime,
    commentCount,
  } = post;
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

  // handle onclick
  const handleClick = () => {
    console.log({ postTitle, _id });
    navigate(`/posts/${_id}`);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className='p-6 mx-auto space-y-12 border rounded-lg hover:cursor-pointer'>
        <article className='space-y-8 '>
          <div className='space-y-6'>
            {/* post title */}
            <h1 className='text-2xl font-bold md:text-3xl text-center'>
              {postTitle}
            </h1>
            <div className='flex flex-col items-start justify-between w-full md:flex-row md:items-center '>
              {/* Author image */}
              <div className='flex items-center md:space-x-2'>
                <img
                  src={authorImage}
                  alt=''
                  className='w-12 h-12 border rounded-full '
                />
                {/* Time */}
                <p className='text-sm'>• {formatPostTime(postTime)}</p>
              </div>
              {/* votes & comments count */}
              <p className='flex-shrink-0 mt-3 text-sm md:mt-0'>
                • {commentCount || 0} comments • {upVote + downVote} votes
              </p>
            </div>
          </div>
        </article>
        <div>
          <h1>#{postTag}</h1>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
