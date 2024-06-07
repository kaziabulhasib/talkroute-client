import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CommentSection = ({ postTitle }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const userEmail = user.email;
    // const postTitle = postTitle;
    const commentInfo = { comment, userEmail, postTitle };
    console.log(commentInfo);

    const commentRes = await axiosSecure.post("/comments", commentInfo);
    console.log(commentRes);
  };
  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          name='comment'
          placeholder='Write a comment...'
          className='textarea textarea-bordered textarea-lg w-full  mb-4'></textarea>

        <input type='submit' className='btn' />
      </form>
    </div>
  );
};

export default CommentSection;
