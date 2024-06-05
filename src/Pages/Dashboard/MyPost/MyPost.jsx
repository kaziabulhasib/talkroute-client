import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa6";
import { LiaComments } from "react-icons/lia";

const MyPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (user && user.email) {
        try {
          const response = await axiosSecure.get(`/posts/user/${user.email}`);
          if (response.status === 200) {
            setPosts(response.data);
          } else {
            console.error("Failed to fetch posts");
          }
        } catch (error) {
          console.error("Error fetching posts", error);
        }
      }
      setLoading(false);
    };

    fetchUserPosts();
  }, [user, axiosSecure]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='px-24 my-16'>
      <h1 className='text-4xl text-center'>Total Posts : {posts.length}</h1>
      <div>
        {posts.length > 0 ? (
          <div className='overflow-x-auto my-14'>
            <table className='table table-xs table-pin-rows table-pin-cols'>
              <thead className='text-xl'>
                <tr>
                  <th></th>
                  <td>Post Title</td>
                  <td>Vote</td>
                  <td>Comments</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr className='text-2xl' key={post._id}>
                    <th className=' py-4 text-[18px]'>{index + 1}</th>
                    <td className=' py-4 text-[18px]'>{post.postTitle}</td>
                    <td className=' py-4 text-[18px] '>{0}</td>
                    <td className=' py-4 text-[18px] flex '>
                      <LiaComments />
                    </td>
                    <td className=' py-4 text-[18px]'>
                      <FaTrash></FaTrash>
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
  );
};

export default MyPost;
