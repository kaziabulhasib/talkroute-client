import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import Error from "../Components/Error/Error";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Membership from "../Pages/Membership/Membership";
import PostDetails from "../Pages/PostDetails/PostDetails";

import Dashboard from "../Layout/Dashboard";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";

import AddNewPost from "../Pages/Dashboard/AddNewPost/AddNewPost";
import MyPost from "../Pages/Dashboard/MyPost/MyPost";
import PrivateRoute from "./PrivateRoute";
import CommentsPage from "../Pages/CommentsPage/CommentsPage";
import AllUser from "../Pages/Dashboard/AllUser/AllUser";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import Activites from "../Pages/Dashboard/Activites/Activites";
import MakeAnnouncement from "../Pages/Dashboard/MakeAnnouncement/MakeAnnouncement";
import Payment from "../Pages/Dashboard/Payment/Payment";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/posts/:id",
        element: <PostDetails></PostDetails>,
        loader: async ({ params }) => {
          const response = await fetch(
            `https://talkroute-server.vercel.app/posts/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch post");
          }
          const post = await response.json();
          return { post };
        },
      },
      {
        path: "/membership",
        element: (
          <PrivateRoute>
            <Membership></Membership>
          </PrivateRoute>
        ),
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // admin routes
      {
        path: "adminprofile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUser></AllUser>
          </AdminRoute>
        ),
      },
      {
        path: "activities",
        element: (
          <AdminRoute>
            <Activites></Activites>
          </AdminRoute>
        ),
      },
      {
        path: "makeannouncement",
        element: (
          <AdminRoute>
            <MakeAnnouncement></MakeAnnouncement>
          </AdminRoute>
        ),
      },
      {
        path: "myprofile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "addpost",
        element: <AddNewPost></AddNewPost>,
      },
      {
        path: "mypost",
        element: <MyPost></MyPost>,
      },
      {
        path: "comments/:id",
        element: <CommentsPage></CommentsPage>,
      },
    ],
  },
]);
