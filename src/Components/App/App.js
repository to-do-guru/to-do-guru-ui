import './App.css';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Login from '../Login/Login';
import HouseForm from '../HouseForm/HouseForm';
import ChoreForm from '../ChoreForm/ChoreForm';
import Dashboard from '../Dashboard/Dashboard';

function App() {
	return (
		<main>
			<Switch>
				<Route exact path="/">
					<h1>To-Do Guru</h1>
					<input
					type="text"
					placeholder="Name of Household"
					/>
					<button>Submit</button>
				</Route>

				<Route path="*">
					<Redirect from="*" to="/" />
				</Route>
			</Switch>
		</main>
	);
}

export default App;
