import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  return (
    <main className="test-page">
      <h1>create sub_script_ account here!</h1>

      {errorMsg && <div>{errorMsg}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={FormData.username}
          onChange={handleChange}
          required
        />
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
        <button type="submit">SIGN UP!</button>
      </form>

      <div>
        <p>
          ALREADY HAVE AN ACCOUNT? <Link to="/login">LOG IN HERE</Link>
        </p>
      </div>

      <div>
        <button
          onClick={() =>
            (window.location.href =
              "http://localhost:5000/api/users/auth/github")
          }
        >
          SIGN IN WITH GITHUB
        </button>
      </div>
    </main>
  );
};

export default Register;
