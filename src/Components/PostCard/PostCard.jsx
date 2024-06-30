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
        className='p-6 mx-auto space-y-12 border rounded-lg hover:cursor-pointer  '>
        <article className='space-y-8 '>
          <div className='space-y-6'>
            {/* post title */}

            <div id='my-anchor-element' data-tooltip-content={postTitle}>
              {" "}
              <h1
                className='text-xl font-bold md:text-2xl text-left h-16 '
                // title={postTitle}
              >
                {limitedTitle}
              </h1>
            </div>

            <Tooltip anchorSelect='#my-anchor-element' />
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
                {/* Time */}
                <p className='text-sm text-blue-950'>
                  {" "}
                  {formatPostTime(postTime)}
                </p>
              </div>
              {/* votes & comments count */}
              {/* <p className='flex-shrink-0 mt-3 text-sm md:mt-0'>
                • {commentCount || 0} comments • {upVote + downVote} votes •
              </p> */}
            </div>
          </div>
        </article>
        <div className='flex items-center  justify-evenly gap-2 border p-2 '>
          <h1 className='  text-center    font-semibold rounded-md text-xl tracking-widest'>
            #{postTag}
          </h1>
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
