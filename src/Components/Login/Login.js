import './Login.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {

    const isNewUser = () => {
		if (true) {
			return "/houseform"
		} else {
			return "/dashboard"
		}
	}

    return (
        <>
            <h1>I AM A Login</h1>
            <NavLink to={isNewUser}>
				<button>Login</button>
			</NavLink>
        </>
    );
}

export default Login;