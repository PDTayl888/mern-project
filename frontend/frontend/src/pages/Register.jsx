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
    <main style={pageStyle}>
      <div style={formStyle}>
        <h3>create sub_script_ account here!</h3>

        {errorMsg && <div>{errorMsg}</div>}

        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
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
            value={FormData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" style={buttonStyle}>
            SIGN UP!
          </button>
        </form>

        <div>
          <p>
            ALREADY HAVE AN ACCOUNT? <Link to="/login">LOG IN HERE</Link>
          </p>
        </div>

        <div>
          <button
            style={buttonStyle}
            onClick={() =>
              (window.location.href =
                "https://mern-project-41xe.onrender.com/api/users/auth/github")
            }
          >
            SIGN IN WITH GITHUB
          </button>
        </div>
      </div>
    </main>
  );
};

export default Register;
