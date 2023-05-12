import './Dashboard.css';
import ChoreCard from '../ChoreCard/ChoreCard';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

function Dashboard() {
    return (
        <>
            <h1>I AM A Dashboard</h1>
            <ChoreCard />
            <NavLink to="/">
				<button>Log Out</button>
			</NavLink>
        </>
    );
}

export default Dashboard;