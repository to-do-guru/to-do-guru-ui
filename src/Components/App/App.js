import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Login from '../Login/Login';
import HouseForm from '../HouseForm/HouseForm';
import ChoreForm from '../ChoreForm/ChoreForm';
import Dashboard from '../Dashboard/Dashboard';
import { useState } from 'react';

const App = ()  => {
  const [email, setEmail] = useState('smith@example.com');
	const [logInError, setLogInError] = useState(false)

	return (
		<main>
			<Switch>
				<Route exact path="/">
					<Login setEmail={setEmail} logInError={logInError}/>
				</Route>

				<Route exact path="/houseform">
					<HouseForm email={email}/>
				</Route>

				<Route exact path="/choreform">
					<ChoreForm email={email}/>
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
