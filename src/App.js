import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import NavBar from "./components/NavBar";

import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

const theme = createMuiTheme({
	palette: {
		primary: {
			light: "#212121",
			main: "#212121",
			dark: "#212121",
			contrastText: "#fff",
		},
		secondary: {
			light: "#212121",
			main: "#212121",
			dark: "#212121",
			contrastText: "#000",
		},
	},
	typography: {
		useNextVariants: true,
	},
});

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<div className="App">
					<Router>
						<NavBar />
						<div className="container">
							<Switch>
								<Route exact path="/" component={home} />
								<Route exact path="/login" component={login} />
								<Route exact path="/signup" component={signup} />
							</Switch>
						</div>
					</Router>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
