import { FaTrash } from "react-icons/fa6";
import { LiaComments } from "react-icons/lia";
import useMyPost from "../../../hooks/useMyPost";

const MyPost = () => {
  const [posts, refetch, isLoading, error] = useMyPost();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching posts</div>;
  }

  return (
    <div className='px-24 my-16'>
      <h1 className='text-4xl text-center '>Total Posts : {posts.length}</h1>
      <div>
        {posts.length > 0 ? (
          <div className='overflow-x-auto my-14 border'>
            <table className='table table-xs table-pin-rows table-pin-cols'>
              <thead className='text-xl '>
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
                    <th className='py-4 text-[18px]'>{index + 1}</th>
                    <td className='py-4 text-[18px]'>{post.postTitle}</td>
                    <td className='py-4 text-[18px]'>{0}</td>
                    <td className='py-4'>
                      <LiaComments className='text-4xl ml-6' />
                    </td>
                    <td className='py-4 text-[18px]'>
                      <FaTrash className='text-3xl ml-4 hover:cursor-pointer' />
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
