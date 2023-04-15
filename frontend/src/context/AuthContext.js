import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { get } from "../utils/api";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), async (authUser) => {
      try {
        if (authUser?.uid && !user) {
          const data = await get(`/users/${authUser.uid}`);

          setUser(data.data);
        } else {
          setUser(null);
        }
      } catch (e) {}
    });

    return subscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
