import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useState } from "react";
import Modal from "../../../Components/Modal";

const Announcements = () => {
  const axiosPublic = useAxiosPublic();
  const [showModal, setShowModal] = useState(false);
  const [fullComment, setFullComment] = useState("");

  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosPublic.get("/announcements");
      return res.data;
    },
  });

  if (announcements.length < 1) {
    return null;
  }

  const handleReadMore = (announcement) => {
    setFullComment(announcement);
    setShowModal(true);
  };

  return (
    <div>
      <h1 className='lg:text-3xl text-xl text-center font-semibold text-gray-700 mb-12'>
        Announcement
      </h1>
      <div className='overflow-x-auto my-8 lg:mx-8'>
        <table className='table table-zebra'>
          {/* head */}
          <thead>
            <tr className='text-xl font-medium'>
              <th></th>
              <th>Announced by</th>
              <th>Title</th>

              <th>Announcement</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement) => (
              <tr key={announcement._id}>
                <th>
                  <img
                    src={announcement.authorImage}
                    alt='author-image'
                    className='w-8 h-8'
                  />
                </th>
                <td>{announcement.authorName}</td>
                <td>{announcement.title}</td>
                <td>
                  {announcement.description.substring(0, 100)}
                  {announcement.description.length > 100 && (
                    <span
                      className='text-blue-500 underline cursor-pointer ml-2'
                      onClick={() => handleReadMore(announcement.description)}>
                      Read More
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <p>{fullComment}</p>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Announcements;
