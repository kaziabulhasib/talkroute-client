import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CommentSection = ({ postTitle, commentTextAreaRef, postId }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("please Login to comment");
      navigate("/login", { state: location.pathname });
      return;
    }
    const comment = e.target.comment.value;
    const userEmail = user.email;

    const commentInfo = { comment, userEmail, postTitle, postId };
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
          className='textarea textarea-bordered textarea-lg w-full mb-4'
          ref={commentTextAreaRef}></textarea>

        <input type='submit' className='btn' />
      </form>
    </div>
  );
};

export default CommentSection;
