import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash, FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // amdin handle

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();

        Swal.fire({
          title: "Success!",
          text: `${user.name} is admin now!`,
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>TalkRoute | Manage Users</title>
      </Helmet>
      <div className='mx-16'>
        {/* <h1>Total Users: {users.length}</h1> */}
        <div className='overflow-x-auto'>
          <table className='table table-zebra'>
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user?.role === "admin" ? (
                      "Admin"
                    ) : (
                      // <FaUsers
                      //   // onClick={() => handleMakeAdmin(user)}
                      //   className='bg-yellow-600 text-4xl text-white p-2 cursor-pointer '></FaUsers>
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className='btn btn-sm btn-ghost font-medium '>
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td>
                    <p>Membership Status</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
