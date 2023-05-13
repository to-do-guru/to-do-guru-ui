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
      <div className='login'>
        <h1>I AM A Login</h1>
        <input
					type="text"
					placeholder="Name of Household"
					/>
        <NavLink to={isNewUser}>
          <button>Login</button>
        </NavLink>
      </div>
    );
}

export default Login;