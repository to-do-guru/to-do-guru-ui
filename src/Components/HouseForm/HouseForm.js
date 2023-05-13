import './HouseForm.css';
import { NavLink } from 'react-router-dom';

function HouseForm() {
    return (
        <>
            <h1>Edit your Household!</h1>
            <NavLink to="/dashboard">
				<button>See Schedule</button>
			</NavLink>
        </>
    );
}

export default HouseForm;