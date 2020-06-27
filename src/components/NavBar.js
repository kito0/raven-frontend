import React, { Component, Fragment } from 'react';
import Link from 'react-router-dom/Link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonTemplate from '../util/ButtonTemplate';
import PostScream from './PostScream';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';

class NavBar extends Component {
	render() {
		const { authenticated } = this.props;
		return (
			<AppBar>
				<Toolbar className="nav-container">
					{authenticated ? (
						<Fragment>
							<PostScream />
							<Link to="/">
								<ButtonTemplate tip="Home">
									<HomeIcon color="secondary" />
								</ButtonTemplate>
							</Link>
							<ButtonTemplate tip="Notifications">
								<NotificationsIcon color="secondary" />
							</ButtonTemplate>
						</Fragment>
					) : (
						<Fragment>
							<Button color="inherit" component={Link} to="/">
								Home
							</Button>
							<Button color="inherit" component={Link} to="/login">
								Login
							</Button>
							<Button color="inherit" component={Link} to="/signup">
								Signup
							</Button>
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
		);
	}
}

NavBar.propTypes = {
	authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(NavBar);
