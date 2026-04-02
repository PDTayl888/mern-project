import { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { fetchClient } from './../utils/apiClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await fetchClient("/api/users/profile");
          setUser(userData);
        } catch (err) {
          console.log(err);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

const login = async (email, password) => {
    try {
      const data = await fetchClient("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("token", data.token);
      setUser(data.user); 
      return data;
    } catch (error) {
      console.error("Login failed", error);
      throw error; 
    }
  };

  const register = async (userData) => {
    const data = await fetchClient("/api/users/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
    //maybe the navigate way, try them both!!!!
    //navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, register, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
