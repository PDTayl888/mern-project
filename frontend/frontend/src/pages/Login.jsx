import { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    backgroundColor: "#1a2a3a",
    color: "white",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#008080",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    width: "100%",
    maxWidth: "320px",
  };
  const inputStyle = {
    padding: "8px 10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "2px solid #00e5ff",
    backgroundColor: "#1a2a3a",
    color: "white",
    fontSize: "1.1rem",
  };
  const buttonStyle = {
    backgroundColor: "#00e5ff",
    color: "#1a2a3a",
    border: "none",
    padding: "7px",
    margin: "1.5px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
  };

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
      //navigate("/");
    }

    if (error) {
      console.log(error);
    }
  }, [searchParams, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <main style={pageStyle}>
      <div style={formStyle}>
        <h2>Log in:</h2>

        {errorMsg && <div>{errorMsg}</div>}

        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            type="email"
            name="email"
            placeholder="email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            style={inputStyle}
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" style={buttonStyle}>
            login
          </button>
        </form>

        <div>
          <p>
            <Link to="/register">click here to register!</Link>
          </p>
        </div>

        <div>
          <span>OR</span>
        </div>

        <div>
          <button
            style={buttonStyle}
            onClick={() =>
              (window.location.href =
                "https://mern-project-41xe.onrender.com/api/users/auth/github")
            }
          >
            LOGIN WITH GITHUB
          </button>
        </div>
      </div>
    </main>
  );
};
export default Login;
