import './ChoreForm.css';
import { NavLink } from 'react-router-dom';

function ChoreForm() {
    return (
        <>
            <h1>Edit your Chores!</h1>


            <NavLink to="/dashboard">
				<button>View Schedule</button>
			</NavLink>
        </>
    );
}

export default ChoreForm;