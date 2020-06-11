import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';
import NavBar from './components/NavBar';
import themeFile from './util/theme';
import AuthRoute from './util/AuthRoute';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		window.location.href = '/login';
		authenticated = true;
	} else {
		authenticated = true;
	}
}

axios.defaults.baseURL =
	'https://us-central1-raven-social.cloudfunctions.net/api';

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Provider store={store}>
					<Router>
						<NavBar />
						<div className="container">
							<Switch>
								<Route exact path="/" component={home} />
								<AuthRoute
									exact
									path="/login"
									component={login}
									authenticated={authenticated}
								/>
								<AuthRoute
									exact
									path="/signup"
									component={signup}
									authenticated={authenticated}
								/>
							</Switch>
						</div>
					</Router>
				</Provider>
			</MuiThemeProvider>
		);
	}
}

export default App;
