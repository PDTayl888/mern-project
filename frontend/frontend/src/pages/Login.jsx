import { useState } from "react";
import { useParams, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Log in:</h1>

      <form onSubmit={handleSubmit}></form>
      <input
        type="email"
        name="email"
        placeholder="email address"
        value={FormData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={FormData.password}
        onChange={handleChange}
        required
      />
    </main>
  );
};
