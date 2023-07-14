import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import api from "../api/posts";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [userInfo, setUserInfo] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        getUser();
      } else {
        setCurrentUser(null);
      }
    });

    const getUser = async () => {
      try {
        const userId = currentUser?.uid;
        const response = await api.get(`/user/${userId}`);
        if (response.status === "200") {
          setUserInfo(response.data.getaUser);
          setUserRole(userInfo.role);
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

    return unsubscribe();
  }, []);

  return {
    currentUser, userInfo, userRole
  };
};

export default useAuth;
