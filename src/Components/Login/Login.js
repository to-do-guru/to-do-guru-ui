import { useState } from 'react';
import './Login.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const Login = ({setEmail, logInError}) => {
  const [loginInfo, setLoginInfo] = useState('')

 if (logInError) {
  return <p>"default login is smith@example.com"</p>
 }

  return (
    <div className='login'>
      <h1>Welcome to To-Do Guru!</h1>
      <h2>Login to view your chore schedule!</h2>
      <input
				type="text"
				placeholder="Username/Email"
        value={loginInfo}
        onChange={(e) => setLoginInfo(e.target.value)}
			/>
      <NavLink to="/dashboard">
        <button className='login-btn' onClick={() => setEmail(loginInfo)}>Login</button>
      </NavLink>
    </div>
  );
}

export default Login;