import { createContext, useState, useEffect } from 'react';
import { fetch } from '../utils/apiClient';

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
};

