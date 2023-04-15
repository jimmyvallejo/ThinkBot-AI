import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //   const [loading, setLoading] = useState(false);
  //   const history = useHistory();

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), async (authUser) => {
      if (authUser?.uid && !user) {
        const data = await axios.get(
          `http://127.0.0.1:5001/miami-hackathon-ai/us-central1/api/users/${authUser.uid}`
        );

        setUser(data.data);
      } else {
        setUser(null);
      }
    });

    return subscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
