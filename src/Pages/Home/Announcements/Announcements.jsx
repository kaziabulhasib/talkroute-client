import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Tooltip } from "react-tooltip";

const Announcements = () => {
  const axiosPublic = useAxiosPublic();

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
                    className='w-8 h-8 rounded-full'
                  />
                </th>
                <td>{announcement.authorName}</td>
                <td>{announcement.title}</td>
                {/* <td title={announcement.description}>
                  {announcement.description.substring(0, 100)}
                  {announcement.description.length > 100 && (
                    <span>........</span>
                  )}
                </td> */}
                <a
                  id='my-anchor-element'
                  data-tooltip-content={announcement.description}
                  data-tooltip-variant='info'>
                  {" "}
                  <td>
                    {announcement.description.substring(0, 100)}
                    {announcement.description.length > 100 && (
                      <span>........</span>
                    )}
                  </td>
                </a>
                <Tooltip
                  style={{
                    backgroundColor: "#304463",
                    color: "#ffff",
                    fontWeight: "medium",
                    width: "auto",
                    height: "auto",
                    // padding: "16px",
                    textAlign: "center",
                  }}
                  anchorSelect='#my-anchor-element'
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Announcements;
