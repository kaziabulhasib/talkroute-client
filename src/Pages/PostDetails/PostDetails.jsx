import { useRef, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { useLoaderData, useNavigate } from "react-router-dom";
import CommentSection from "../../Components/CommentSection";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FacebookShareButton } from "react-share";
import { Helmet } from "react-helmet";

const PostDetails = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  const commentTextAreaRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [post, setPost] = useState(data.post);

  // Show loader if data is loading
  if (!data || !data.post) {
    return <div>Loading...</div>;
  }

  // const { post } = data;
  const {
    _id: postId,
    postTitle,
    authorName,
    authorEmail,
    authorImage,
    postDescription,
    postTag,
    upVote,
    downVote,
    postTime,
  } = post;

  // Date format
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

  // Focus on the comment text area
  const handleCommentIconClick = () => {
    if (commentTextAreaRef.current) {
      commentTextAreaRef.current.focus();
    }
  };
  // upvote hancle
  const handleUpVote = async () => {
    if (!user) {
      toast.error("please Login to vote");
      navigate("/login");
      return;
    }
    try {
      const userId = user.email;
      const response = await axiosSecure.post(`/posts/${postId}/upvote`, {
        userId,
      });
      if (response.status === 200) {
        setPost((prevPost) => ({
          ...prevPost,
          upVote: prevPost.upVote + 1,
        }));
      }
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };
  // downvote handle
  const handleDownVote = async () => {
    if (!user) {
      toast.error("please Login to vote");
      navigate("/login");
      return;
    }
    try {
      const userId = user.email;
      const response = await axiosSecure.post(`/posts/${postId}/downvote`, {
        userId,
      });
      if (response.status === 200) {
        setPost((prevPost) => ({
          ...prevPost,
          upVote: prevPost.upVote + 1,
        }));
      }
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  // share url
  const shareUrl = `https://talk-route.web.app/posts/${postId}`;
  // const shareUrl = "https://www.npmjs.com/package/react-share";

  console.log(shareUrl);

  // Handle share button click
  const handleShareClick = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to share");
      navigate("/login");
      return;
    }
  };

  return (
    <div>
      <Helmet>
        <title>TalkRoute | PostDetails</title>
      </Helmet>
      <article className='max-w-2xl mx-auto space-y-12 dark:bg-gray-100 dark:text-gray-900 border mt-16 px-20 py-16'>
        <div className='w-full mx-auto space-y-4 '>
          <h1 className='text-2xl font-bold leading-tight md:text-3xl'>
            {postTitle}
          </h1>
          <p className='text-sm text-center dark:text-gray-600'>
            by
            <a
              rel='noopener noreferrer'
              href='#'
              target='_blank'
              className='underline text-blue-700'>
              <span className='mx-2'> {authorName} </span>
            </a>
            on
            <span className='mx-2'> {formatPostTime(postTime)} </span>
          </p>
        </div>
        <div className='dark:text-gray-800'>
          <p>{postDescription}</p>
        </div>
        <div className='pt-2 border-t mb-6 py-4'>
          <div>
            <h1>#{postTag}</h1>
          </div>
          <div className='flex flex-col items-center justify-center space-y-4 md:space-y-0 md:space-x-6 md:flex-row'>
            <img
              src={authorImage}
              alt='Author Image'
              className='self-center flex-shrink-0 w-24 h-24 p-2 bg-white  border-2 border-slate-600 rounded-full md:justify-self-start '
            />
            <div className='flex flex-col justify-center'>
              <h4 className='text-3xl font-bold'>{authorName}</h4>
            </div>
          </div>
          <div className='flex justify-between pt-12 space-x-4 align-center'>
            <a
              title='Make a Comment'
              rel='noopener noreferrer'
              href='#comment-section'
              aria-label='Comment'
              className='p-4 rounded-md text-3xl border text-center hover:bg-gray-700 hover:text-white'
              onClick={handleCommentIconClick}>
              <FaComment />
            </a>
            <a
              title='Down Vote'
              rel='noopener noreferrer'
              href='#'
              onClick={handleUpVote}
              className='p-4 rounded-md text-3xl border'>
              <BiUpvote />
            </a>
            <a
              title='Down Vote'
              onClick={handleDownVote}
              rel='noopener noreferrer'
              href='#'
              className='p-4 rounded-md text-3xl border'>
              <BiDownvote />
            </a>

            <a
              rel='noopener noreferrer'
              title='Share to Facebook'
              href='#'
              onClick={handleShareClick}
              aria-label='Share'
              className='p-4 rounded-md text-3xl border hover:bg-gray-700 hover:text-white'>
              {user ? (
                <FacebookShareButton url={shareUrl}>
                  <FaRegShareFromSquare />
                </FacebookShareButton>
              ) : (
                <FaRegShareFromSquare />
              )}
            </a>
          </div>
        </div>
        <div className='divider'></div>
        <CommentSection
          postTitle={postTitle}
          postId={postId}
          id='comment-section'
          commentTextAreaRef={commentTextAreaRef}
        />
      </article>
    </div>
  );
};

export default PostDetails;
