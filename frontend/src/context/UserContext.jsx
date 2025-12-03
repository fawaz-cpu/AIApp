import { createContext, useContext, useEffect, useState } from "react";
import client from "../api/axiosClient";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    try {
      const res = await client.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      localStorage.removeItem("access_token");
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loadUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
