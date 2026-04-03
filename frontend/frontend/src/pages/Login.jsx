import { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/";
    }

    if (error) {
      console.log(error);
    }
  }, [searchParams]);

  //TODO: SHOW TEH USER AN ERROR MESSAGE!!

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  return (
    <main className="test-page">
      <h1>Log in:</h1>

      {errorMsg && <div>{errorMsg}</div>}

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
              "https://mern-project-41xe.onrender.com/api/users/auth/github")
          }
        >
          LOGIN WITH GITHUB
        </button>
      </div>
    </main>
  );
};
export default Login;
