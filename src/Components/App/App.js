import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Login from '../Login/Login';
import HouseForm from '../HouseForm/HouseForm';
import ChoreForm from '../ChoreForm/ChoreForm';
import Dashboard from '../Dashboard/Dashboard';
import { useState } from 'react';

const App = ()  => {
  const [email, setEmail] = useState('smith@example.com');

	return (
		<main>
			<Switch>
				<Route exact path="/">
					<Login setEmail={setEmail}/>
				</Route>

				<Route exact path="/houseform">
					<HouseForm />
				</Route>

				<Route exact path="/choreform">
					<ChoreForm />
				</Route>

				<Route exact path="/dashboard">
					<Dashboard email={email} />
				</Route>

				<Route path="*">
					<Redirect from="*" to="/" />
				</Route>
			</Switch>
		</main>
	);
}

export default App;
