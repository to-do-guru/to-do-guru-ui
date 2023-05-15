import './Login.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {
  return (
    <div className='login'>
      <h1>Welcome to To-Do Guru!</h1>
      <h2>Login to view your chore schedule!</h2>
      <input
				type="text"
				placeholder="Username/Email"
			/>
      <NavLink to="/dashboard">
      <button className='login-btn'>Login</button>
      </NavLink>
    </div>
  );
}

export default Login;