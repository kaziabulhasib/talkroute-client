const PostCard = ({ post }) => {
  const {
    authorImage,
    authorName,
    authorEmail,
    postTitle,
    postDescription,
    tags,
    upVote,
    downVote,
    postTime,
    commentCount,
  } = post;
  return (
    <div>
      <div className=' p-6 mx-auto space-y-12 border rounded-lg'>
        <article className='space-y-8  '>
          <div className='space-y-6'>
            {/* post title */}
            <h1 className='text-2xl font-bold  md:text-3xl text-center'>
              {postTitle}
            </h1>
            <div className='flex flex-col items-start justify-between w-full md:flex-row md:items-center '>
              {/* Author image */}
              <div className='flex items-center md:space-x-2'>
                <img
                  src={authorImage}
                  alt=''
                  className='w-12 h-12 border rounded-full  '
                />
                {/* time */}
                <p className='text-sm'> • {postTime}</p>
              </div>
              {/* votes & comments count */}
              <p className='flex-shrink-0 mt-3 text-sm md:mt-0'>
                {commentCount} comments • {upVote + downVote} votes
              </p>
            </div>
          </div>
        </article>
        <div>
          <div className='flex flex-wrap py-6 gap-2 border-t border-dashed'>
            {tags.map((tag, index) => (
              <a
                key={index}
                rel='noopener noreferrer'
                href='#'
                className='px-3 py-1 rounded-sm hover:underline font-medium '>
                #{tag}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
