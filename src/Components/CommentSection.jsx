import Swal from "sweetalert2";
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
    if (commentRes.data.insertedId) {
      e.target.reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Comment Submitted Successfully`,
        showConfirmButton: false,
        timer: 2500,
      });
    }
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
