import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '../firebase'

const useAuth = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (user)=> {
            if (user) {
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }
        });

        return unsubscribe();
    }, []);

  return {
    currentUser,
  };  



};

export default useAuth;