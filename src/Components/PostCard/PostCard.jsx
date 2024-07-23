import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
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

  const maxLength = 50;
  const ending = "...";

  const limitedTitle =
    postTitle.length > maxLength
      ? postTitle.substring(0, maxLength - ending.length) + ending
      : postTitle;
  return (
    <div>
      <div
        onClick={handleClick}
        className='relative p-6 mx-auto bg-white hover:bg-slate-50 drop-shadow rounded-lg  space-y-8    hover:cursor-pointer mb-4 mr-4 '>
        <button className='btn btn-xs bg-blue-500 hover:bg-blue-600 text-white text-sm absolute top-2 right-2 '>
          {postTag}
        </button>
        <article className='space-y-8 '>
          <div className='space-y-6'>
            {/* post title */}

            <a
              id='my-anchor-element'
              data-tooltip-content={postTitle}
              data-tooltip-variant='info'>
              {" "}
              <h1
                className='text-xl font-bold md:text-2xl text-left h-16 text-gray-700 '
                // title={postTitle}
              >
                {limitedTitle}
              </h1>
            </a>

            <Tooltip
              // style={{
              //   backgroundColor: "#304463",
              //   color: "#ffff",
              //   fontWeight: "bold",
              //
              // }}
              anchorSelect='#my-anchor-element'
            />
            <div>
              {/* Author image */}
              <div className='flex justify-between   items-center md:space-x-2'>
                <div className='flex gap-4 items-center  '>
                  {" "}
                  <img
                    src={authorImage}
                    alt=''
                    className='lg:w-12 lg:h-12 w-6 h-6 border rounded-full '
                  />
                  <h1 className='text-blue-700 underline '>{authorName}</h1>
                </div>
                {/* to do  */}
                {/* Time */}
                <p className='text-sm text-blue-950'>
                  {" "}
                  {formatPostTime(postTime)}
                </p>
              </div>
            </div>
          </div>
        </article>
        <div className='flex items-center  justify-evenly gap-2  p-2 '>
          {/* votes & comments count */}
          <p className='flex-shrink-0 mt-3  md:mt-0'>
            {commentCount || 0} comments • {upVote + downVote} votes
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
