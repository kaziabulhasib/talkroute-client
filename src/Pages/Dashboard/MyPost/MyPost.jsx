import { FaTrash } from "react-icons/fa6";
import { LiaComments } from "react-icons/lia";
import useMyPost from "../../../hooks/useMyPost";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const MyPost = () => {
  const [posts, refetch, isLoading, error] = useMyPost();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching posts</div>;
  }

  // handle comment function

  const handleComment = (id) => {
    console.log("post id", id);

    navigate(`/dashboard/comments/${id}`);
  };

  // delte function
  const handleDeltePost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/posts/${id}`).then((res) => {
          console.log(res);
          if (res.data.deletedCount > 0) {
            refetch();
            // swal
            Swal.fire({
              title: "Deleted!",
              text: "Your Post has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>TalkRoute | MyPost</title>
      </Helmet>
      <div className='lg:px-24 px-2 lg:my-16 my-2'>
        <h1 className='text-4xl text-center '>Total Posts : {posts.length}</h1>
        <div>
          {posts.length > 0 ? (
            <div className='overflow-x-auto lg:my-14 my-2 border'>
              <table className='table table-xs table-pin-rows table-pin-cols'>
                <thead className='lg:text-xl text-base '>
                  <tr>
                    <th></th>
                    <td>Post Title</td>
                    <td>Vote</td>
                    <td>Comments</td>
                    <td>Delete</td>
                  </tr>
                </thead>
                <tbody className=''>
                  {posts.map((post, index) => (
                    <tr className='text-2xl ' key={post._id}>
                      <th className='py-4 lg:text-[18px] text-base'>
                        {index + 1}
                      </th>

                      <td className='py-4 w-full lg:text-[18px] text-base'>
                        {post.postTitle}
                      </td>
                      <td className='py-4 lg:text-[18px] text-base'>
                        {post.upVote + post.downVote}
                      </td>
                      <td className='py-4'>
                        <button
                          onClick={() => handleComment(post._id)}
                          className='btn btn-ghost '>
                          <LiaComments className='text-4xl ' />
                        </button>
                      </td>
                      <td className='py-4 text-[18px]'>
                        <button
                          onClick={() => handleDeltePost(post._id)}
                          className='btn btn-ghost'>
                          <FaTrash className='text-3xl  hover:cursor-pointer' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No posts found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPost;
