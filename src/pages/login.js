import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginIcon from '../images/raven-login.svg';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
	...theme.formStyle,
	root: {
		background: 'transparent',
	},
	input: {
		color: '#959b9b',
	},
});

class login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {},
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors });
		}
	}
	handleSubmit = (event) => {
		event.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password,
		};
		this.props.loginUser(userData, this.props.history);
	};
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	render() {
		const {
			classes,
			UI: { loading },
		} = this.props;
		const { errors } = this.state;
		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
					<img src={LoginIcon} alt="raven-login" width="150px" />
					<Typography variant="h2" className={classes.pageTitle}>
						Login
					</Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							color="secondary"
							id="email"
							name="email"
							type="email"
							label="Email"
							helperText={errors.email}
							error={errors.email ? true : false}
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth
							InputProps={{
								className: classes.input,
								classes: {
									root: classes.root,
									error: classes.error,
									underline: classes.underline,
								},
							}}
							FormHelperTextProps={{
								classes: {
									root: classes.root,
									error: classes.error,
								},
							}}
							InputLabelProps={{
								className: classes.input,
								classes: {
									root: classes.root,
									asterisk: classes.asterisk,
									error: classes.error,
								},
							}}
							defaultValue="color"
							className={classes.root}
						/>
						<TextField
							color="secondary"
							id="password"
							name="password"
							type="password"
							label="Password"
							helperText={errors.password}
							error={errors.password ? true : false}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
							InputProps={{
								className: classes.input,
								classes: {
									root: classes.root,
									error: classes.error,
									underline: classes.underline,
								},
							}}
							FormHelperTextProps={{
								classes: {
									root: classes.root,
									error: classes.error,
								},
							}}
							InputLabelProps={{
								className: classes.input,
								classes: {
									root: classes.root,
									asterisk: classes.asterisk,
									error: classes.error,
								},
							}}
							defaultValue="color"
							className={classes.root}
						/>
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.button}
							disabled={loading}
						>
							LOGIN
							{loading && (
								<CircularProgress
									size={30}
									color="secondary"
									className={classes.progress}
								/>
							)}
						</Button>
						<br />
						<small>
							Don't have an account? Sign up <Link to="/signup">here</Link>
						</small>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		);
	}
}

login.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
});

const mapActionsToProps = {
	loginUser,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(login));
