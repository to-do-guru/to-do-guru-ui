import './Login.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {
    return (
        <>
            <h1>Welcome to To-Do Guru!</h1>
            <h2>Login to view your chore schedule!</h2>
            <NavLink to="/dashboard">
				<button>Login</button>
			</NavLink>
        </>
    );
}

export default Login;