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
            `http://localhost:5000/posts/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch post");
          }
          const post = await response.json();
          return { post }; // Make sure it returns an object with a `post` key
        },
      },
      {
        path: "/membership",
        element: <Membership></Membership>,
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
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
    ],
  },
]);
