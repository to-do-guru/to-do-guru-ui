import './App.css';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min';

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
