import { useState } from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";

const Login = ({ setEmail }) => {
  const [loginInfo, setLoginInfo] = useState("");
  const [error, setError] = useState(false)

  return (
    <div className="login">
      <h1 className="title">To-Do Guru</h1>
      <h2>Got a lot of chores? The Guru is here to help!</h2>
      <p>Try logging in with smith@example.com</p>
      <form>
        <input
          type="text"
          placeholder="Username/Email"
          value={loginInfo}
          onChange={(e) => setLoginInfo(e.target.value)}
        />
        <NavLink
          to="/dashboard"
          onClick={(event) => {
            if (loginInfo !== "smith@example.com") {
              event.preventDefault();
              setError(true)
            } else {
              setEmail(loginInfo)
              setError(false)
            }
          }}
          >
          <button className="login-btn">
            Login
          </button>
        </NavLink>
        {error && <p className="error">Login info is incorrect</p>}
      </form>
    </div>
  );
};

export default Login;
