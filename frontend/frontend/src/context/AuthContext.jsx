import { createContext, useState, useEffect } from 'react';
import { fetch } from '../utils/apiClient';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export AuthProvider = () => {

const [user, setUser] = useState(null);

useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await fetchClient('/api/users/profile');
          setUser(userData);
        } catch (err) {
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const data = await fetchClient('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await fetchClient('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
    //maybe the navigate way, try them both!!!!
    //navigate('/login);
  };


