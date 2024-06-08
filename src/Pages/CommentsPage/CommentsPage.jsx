import { useParams } from "react-router-dom";
import useComments from "../../hooks/useComments";

const CommentsPage = () => {
  const { id } = useParams();
  const [comments, refetch, isLoading, error] = useComments(id);

  console.log(comments);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading comments.</div>;
  }

  return (
    <div>
      <h1>Total comments : {comments.length}</h1>
      <div className='overflow-x-auto my-8 mx-24'>
        <table className='table table-zebra'>
          {/* head */}
          <thead>
            <tr className=' text-xl font-medium'>
              <th></th>
              <th>Email</th>
              <th>Comment</th>

              <th>Feedback</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c, index) => (
              <tr key={c._id}>
                <th>{index + 1}</th>
                <td>{c.userEmail}</td>
                <td>{c.comment.substring(0, 20)}</td>
                <td>
                  <select className='select select-bordered w-full max-w-[160px]'>
                    <option disabled selected>
                      Select Option
                    </option>
                    <option>Spam</option>
                    <option>Harassment</option>
                    <option>Misinformation</option>
                  </select>
                </td>
                <td>
                  <button className='btn btn-outline hover:text-white btn-error btn-sm '>
                    Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentsPage;
