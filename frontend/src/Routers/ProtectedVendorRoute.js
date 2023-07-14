import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../custom-hooks/useAuth";
import api from '../api/posts'

const ProtectedVendorRoute = ({children}) => {

    // One cannot access the vendor dashboard unless they have already applied and have been approved
    // If a user has not applied to be a vendor, they will be redirected to a page to be apply
    
    // If they applied and have been approved, they can access it

    // check if user exists then check if the user role is vendor(meaning they have been approved)
    // *** Find a way to send email notification on approval and show a user if they have not yet been approved ***

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

  return userRole === 'vendor' ? children : <Navigate to="/home" />;
}

export default ProtectedVendorRoute