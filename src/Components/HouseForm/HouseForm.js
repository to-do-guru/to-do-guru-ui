import './HouseForm.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

function HouseForm() {
    return (
        <>
            <h1>I AM A HouseForm</h1>
            <NavLink to="/choreform">
				<button>Continue</button>
			</NavLink>
        </>
    );
}

export default HouseForm;