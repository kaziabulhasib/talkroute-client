import React, { useRef } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";
import CommentSection from "../../Components/CommentSection";

const PostDetails = () => {
  const data = useLoaderData();
  const commentTextAreaRef = useRef(null);

  // Show loader if data is loading
  if (!data || !data.post) {
    return <div>Loading...</div>;
  }

  const { post } = data;
  const {
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

  return (
    <div>
      <article className='max-w-2xl mx-auto space-y-12 dark:bg-gray-100 dark:text-gray-900 border mt-16 px-20 py-16'>
        <div className='w-full mx-auto space-y-4 text-center'>
          <h1 className='text-4xl font-bold leading-tight md:text-5xl'>
            {postTitle}
          </h1>
          <p className='text-sm dark:text-gray-600'>
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
              className='self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-300'
            />
            <div className='flex flex-col justify-center'>
              <h4 className='text-3xl font-bold'>{authorName}</h4>
            </div>
          </div>
          <div className='flex justify-between pt-12 space-x-4 align-center'>
            <a
              rel='noopener noreferrer'
              href='#comment-section'
              aria-label='Comment'
              className='p-4 rounded-md text-3xl border text-center hover:bg-gray-700 hover:text-white'
              onClick={handleCommentIconClick}>
              <FaComment />
            </a>
            <a
              rel='noopener noreferrer'
              href='#'
              className='p-4 rounded-md text-3xl border'>
              <BiUpvote />
            </a>
            <a
              rel='noopener noreferrer'
              href='#'
              className='p-4 rounded-md text-3xl border'>
              <BiDownvote />
            </a>
            <a
              rel='noopener noreferrer'
              href='#'
              aria-label='Share'
              className='p-4 rounded-md text-3xl border hover:bg-gray-700 hover:text-white'>
              <FaRegShareFromSquare />
            </a>
          </div>
        </div>
        <div className='divider'></div>
        <CommentSection
          postTitle={postTitle}
          id='comment-section'
          commentTextAreaRef={commentTextAreaRef}
        />
      </article>
    </div>
  );
};

export default PostDetails;
