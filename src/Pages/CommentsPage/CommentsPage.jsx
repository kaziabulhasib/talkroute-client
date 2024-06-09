import { useParams } from "react-router-dom";
import useComments from "../../hooks/useComments";
import { useState } from "react";
import Modal from "../../Components/Modal";
import { Helmet } from "react-helmet";

const CommentsPage = () => {
  const { id } = useParams();
  const [comments, refetch, isLoading, error] = useComments(id);

  const [showModal, setShowModal] = useState(false);
  const [fullComment, setFullComment] = useState("");

  const [feedbackState, setFeedbackState] = useState({});

  const handleReadMore = (comment) => {
    setFullComment(comment);
    setShowModal(true);
  };

  const handleFeedbackChange = (index, value) => {
    setFeedbackState((prevState) => ({
      ...prevState,
      [index]: { feedback: value, reported: false },
    }));
  };

  const handleReportClick = (index) => {
    setFeedbackState((prevState) => ({
      ...prevState,
      [index]: { ...prevState[index], reported: true },
    }));
  };

  if (isLoading) {
    return (
      <div className='ml-16 mt-8'>
        <span className='loading loading-bars loading-md '></span>
      </div>
    );
  }

  if (error) {
    return <div>Error loading comments.</div>;
  }

  return (
    <div>
      <Helmet>
        <title>TalkRoute | Comments</title>
      </Helmet>
      <div className='my-12'>
        <h1 className='text-2xl font-semibold  text-center border rounded-lg w-fit mx-auto px-6 py-4'>
          Total comments: {comments.length}
        </h1>
        <div className='overflow-x-auto my-8 mx-24'>
          <table className='table table-zebra'>
            {/* head */}
            <thead>
              <tr className='text-xl font-medium'>
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
                  <td>
                    {c.comment.substring(0, 20)}
                    {c.comment.length > 20 && (
                      <span
                        className='text-blue-500 underline cursor-pointer ml-2'
                        onClick={() => handleReadMore(c.comment)}>
                        Read More
                      </span>
                    )}
                  </td>
                  <td>
                    <select
                      className='select select-bordered w-full max-w-[160px]'
                      onChange={(e) =>
                        handleFeedbackChange(index, e.target.value)
                      }
                      value={feedbackState[index]?.feedback || ""}
                      disabled={feedbackState[index]?.reported} // Disable dropdown if reported
                    >
                      <option value='' disabled>
                        Select Option
                      </option>
                      <option value='Spam'>Spam</option>
                      <option value='Harassment'>Harassment</option>
                      <option value='Misinformation'>Misinformation</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className='btn btn-outline hover:text-white btn-error btn-sm'
                      onClick={() => handleReportClick(index)}
                      disabled={
                        !feedbackState[index]?.feedback ||
                        feedbackState[index]?.reported
                      }>
                      Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <p>{fullComment}</p>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CommentsPage;
