import './Dashboard.css';
import ChoreCard from '../ChoreCard/ChoreCard';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';

const Dashboard = () => {

const [dayOfWeek, setDayOfWeek] = useState("")

    return (
        <>
            <h1>I AM A Dashboard</h1>

            <button>Monday</button>
            <button>Tuesday</button>
            <button>Wedesday</button>
            <button>Thursday</button>
            <button>Friday</button>
            <button>Saturday</button>
            <button>Sunday</button>

            <div>
                <ChoreCard />
            </div>
            <NavLink to="/">
				<button>Log Out</button>
			</NavLink>
            <button>Get me a new schedule</button>
            <NavLink to="/choreform">
                <button>Edit Chore List</button>
            </NavLink>
            <NavLink to="/houseform">
                <button>Edit Household</button>
            </NavLink>
        </>
    );
}

export default Dashboard;