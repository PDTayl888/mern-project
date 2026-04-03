const BASE_URL = import.meta.env.VITE_API_URL || "https://mern-project-41xe.onrender.com";

export const fetchClient = async (endpoint, customConfig = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...customConfig.headers,
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const config = {
    ...customConfig,
    headers,
  };
  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "NETWORK REQUEST ERROR");
  }
  return response.json();
};

