import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "./home";
import Profile from "./profile";
import Login from "./login";
import Signup from "./signup";
import ProtectedRoute from "../protectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
