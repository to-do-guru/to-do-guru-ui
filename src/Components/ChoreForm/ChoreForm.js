import './ChoreForm.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

function ChoreForm() {
    return (
        <>
            <h1>I AM A ChoreForm</h1>
            <NavLink to="/dashboard">
				<button>Continue</button>
			</NavLink>
        </>
    );
}

export default ChoreForm;