import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../custom-hooks/useAuth";
import api from '../api/posts'

const ProtectedAdminRoute = ({ children }) => {
  // Only an admin can access the admin pages

  const { currentUser } = useAuth();
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    const getUser = async () => {
      try {
        const userId = currentUser?.uid;
        const response = await api.get(`/user/${userId}`);
        if (response.status === "200") {
          const user = response.data.getaUser;
          setUserRole(user.role);
        }
        console.log(response.data.getaUser);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        } else {
          console.log(error.message);
        }
      }
    };
    getUser();
  }, []);

  return userRole === 'admin' ? children : <Navigate to="/home" />;
};

export default ProtectedAdminRoute;
