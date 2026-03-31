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
  const response = await fetch(endpoint, config);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "NETWORK REQIEST ERROR");
  }
  return response.json();
};
