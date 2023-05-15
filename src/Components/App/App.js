import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Login from '../Login/Login';
import HouseForm from '../HouseForm/HouseForm';
import ChoreForm from '../ChoreForm/ChoreForm';
import Dashboard from '../Dashboard/Dashboard';
// import { useQuery, gql } from "@apollo/client";

// const GET_HOUSEHOLD = gql`
//   query GetUser {
//     queryUser {
//         household
//     }
//   }
// `

const App = ()  => {
  // const { loading, error, data } = useQuery(GET_HOUSEHOLD);

	return (
		<main>
      {/* {console.log('data', data)}
      {console.log('error', error)}
      {console.log('loading', loading)} */}
			<Switch>
				<Route exact path="/">
					<Login />
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
