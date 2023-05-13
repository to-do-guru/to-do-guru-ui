import './Dashboard.css';
import ChoreCard from '../ChoreCard/ChoreCard';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';

const Dashboard = () => {

const [dayOfWeek, setDayOfWeek] = useState("Monday")

    return (
        <>
            <h1>I AM A Dashboard</h1>

            <button onClick={setDayOfWeek("Monday")}>Monday</button>
            <button onClick={setDayOfWeek("Tuesday")}>Tuesday</button>
            <button onClick={setDayOfWeek("Wednesday")}>Wedesday</button>
            <button onClick={setDayOfWeek("Thursday")}>Thursday</button>
            <button onClick={setDayOfWeek("Friday")}>Friday</button>
            <button onClick={setDayOfWeek("Saturday")}>Saturday</button>
            <button onClick={setDayOfWeek("Sunday")}>Sunday</button>

            <div>
                <ChoreCard />
            </div>
            <NavLink to="/">
				<button>Log Out</button>
			</NavLink>
            <button>Get me a new schedule</button>
            <NavLink to="/choreform">
            {/*this edit chore will run a function, not sure where it will live yet*/}.
            <button>Edit Chore List</button>
            </NavLink>
            <NavLink to="/houseform">
                <button>Edit Household</button>
            </NavLink>
        </>
    );
}

export default Dashboard;