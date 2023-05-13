import './App.css';
import { Route, Switch, Redirect} from "react-router-dom";
import Login from '../Login/Login';
import HouseForm from '../HouseForm/HouseForm';
import ChoreForm from '../ChoreForm/ChoreForm';
import Dashboard from '../Dashboard/Dashboard';

const App = ()  => {

	return (
		<main>
			<Switch>
				<Route exact path="/">
					<Login />
					<input
					type="text"
					placeholder="Name of Household"
					/>
				</Route>

				<Route exact path="/houseform">
					<HouseForm />
				</Route>

				<Route exact path="/choreform">
					<ChoreForm />
				</Route>

				<Route exact path="/dashboard">
					<Dashboard />
				</Route>

				<Route path="*">
					<Redirect from="*" to="/" />
				</Route>
			</Switch>
		</main>
	);
}

export default App;
