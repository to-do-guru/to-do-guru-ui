import { useState } from "react";
import "./Login.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const Login = ({ setEmail, logInError }) => {
  const [loginInfo, setLoginInfo] = useState("");
  const [error, setError] = useState(false)

  if (logInError) {
    return <p>"default login is smith@example.com"</p>;
  }
  return (
    <div className="login">
      <h1>Welcome to To-Do Guru!</h1>
      <p>Try logging in with smith@example.com</p>
      <h2>Login to view your chore schedule!</h2>
      <form>
        <input
          type="text"
          placeholder="Username/Email"
          value={loginInfo}
          onChange={(e) => setLoginInfo(e.target.value)}
        />
        {error && <p className="error">Login info is incorrect</p>}
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
      </form>
    </div>
  );
};

export default Login;
