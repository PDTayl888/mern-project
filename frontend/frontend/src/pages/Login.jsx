import { useState } from "react";
import { useParams, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
e.preventDefault();

  };

  return (
    <main>
      <h1>Log in:</h1>

      <form onSubmit={handleSubmit}>
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
        <button type="submit">login</button>
      </form>

      <div>
        <p>
          <Link to="/register">click here to register!</Link>
        </p>
      </div>

      <div>
        <hr />
        <span>OR</span>
        <hr />
      </div>

      <div>
        <button
          onClick={() =>
            (window.location.href =
              "http://localhost:5000/api/users/auth/github")
          }
        >
          Continue with GitHub
        </button>
      </div>
    </main>
  );
};
