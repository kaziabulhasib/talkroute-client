import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyProfile = () => {
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
    <div>
      <h1 className='text-4xl text-center'>My Profile</h1>
      <h2 className='text-2xl text-center'>Total Posts : {posts.length}</h2>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id}>
              <h3>{post.postTitle}</h3>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
