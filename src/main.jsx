import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Here are the router setup
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import './index.css'
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home/Home/Home';
import Login from './pages/Login/Login';
import AuthLayout from './layouts/AuthLayout';
import Register from './pages/Register/Register';
import AuthProvider from './contexts/AuthContext/AuthProvider';
import Rider from './pages/Rider/Rider';
import PrivateRoute from './routes/PrivateRoute';
import SendParcel from './pages/sendParcel/SendParcel';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/send-parcel',
        element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>
      },
      {
        path: '/rider',
        element: <PrivateRoute><Rider></Rider></PrivateRoute>
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      },
    ]
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
