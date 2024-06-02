import PostCard from "../../../Components/PostCard/PostCard";
import usePost from "../../../hooks/usePost";

const Posts = () => {
  const [posts] = usePost();
  //   console.log(post);
  return (
    <div>
      {/* <h1>Total Post: {posts.length}</h1> */}
      <h1 className='text-3xl text-center'>All Posts</h1>
      <div className='grid lg:grid-cols-3 grid-cols-1 gap-6 my-16 border rounded-lg p-8'>
        {posts.map((post) => (
          <PostCard key={post._id} post={post}></PostCard>
        ))}
      </div>
    </div>
  );
};

export default Posts;
