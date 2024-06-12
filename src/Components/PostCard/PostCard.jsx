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
  // limiting title length

  const maxLength = 80;
  const ending = "...";

  const limitedTitle =
    postTitle.length > maxLength
      ? postTitle.substring(0, maxLength - ending.length) + ending
      : postTitle;
  return (
    <div>
      <div
        onClick={handleClick}
        className='p-6 mx-auto space-y-12 border rounded-lg hover:cursor-pointer h-[375px]'>
        <article className='space-y-8 '>
          <div className='space-y-6'>
            {/* post title */}
            <h1
              className='text-xl font-bold md:text-2xl text-left'
              title={postTitle}>
              {limitedTitle}
            </h1>
            <div className='flex lg:flex-row flex-col   lg:items-center justify-between w-full   '>
              {/* Author image */}
              <div className='flex items-center md:space-x-2'>
                •
                <img
                  src={authorImage}
                  alt=''
                  className='lg:w-12 lg:h-12 w-6 h-6 border rounded-full '
                />
                {/* Time */}
                <p className='text-sm'>• {formatPostTime(postTime)}</p>
              </div>
              {/* votes & comments count */}
              <p className='flex-shrink-0 mt-3 text-sm md:mt-0'>
                • {commentCount || 0} comments • {upVote + downVote} votes •
              </p>
            </div>
          </div>
        </article>
        <div>
          <h1 className='bg-gray-700 text-white text-center px-2 py-2 w-2/3 mx-auto font-semibold rounded-md text-xl tracking-widest'>
            #{postTag}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
