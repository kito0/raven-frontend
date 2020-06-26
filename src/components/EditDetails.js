import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ButtonTemplate from '../util/ButtonTemplate';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import EditIcon from '@material-ui/icons/Edit';

import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

const styles = (theme) => ({
	button: {
		float: 'right',
	},
	root: {
		background: 'transparent',
	},
	input: {
		color: '#959b9b',
	},
});

class EditDetails extends Component {
	state = {
		bio: '',
		website: '',
		location: '',
		open: false,
	};
	mapUserDetailsToState = (credentials) => {
		this.setState({
			bio: credentials.bio ? credentials.bio : '',
			website: credentials.website ? credentials.website : '',
			location: credentials.location ? credentials.location : '',
		});
	};
	componentDidMount() {
		const { credentials } = this.props;
		this.mapUserDetailsToState(credentials);
	}
	componentWillReceiveProps = (nextProps) => {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors });
		}
	};
	handleOpen = () => {
		this.setState({ open: true });
		this.mapUserDetailsToState(this.props.credentials);
	};
	handleClose = () => {
		this.setState({ open: false });
	};
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	handleSubmit = () => {
		const userDetails = {
			bio: this.state.bio,
			website: this.state.website,
			location: this.state.location,
		};
		this.props.editUserDetails(userDetails);
		this.handleClose();
	};
	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<ButtonTemplate
					tip="Edit details"
					onClick={this.handleOpen}
					btnClassName={classes.button}
				>
					<EditIcon color="secondary" />
				</ButtonTemplate>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
					className={classes.EditDetails}
					PaperProps={{
						style: {
							backgroundColor: 'rgba(0,0,0, 0.1)',
							boxShadow: '5px 10px 18px',
						},
					}}
				>
					<DialogTitle style={{ color: '#b0b0b0' }}>
						Edit your details
					</DialogTitle>
					<DialogContent>
						<form>
							<TextField
								name="bio"
								type="text"
								label="bio"
								multiline
								rows="3"
								placeholder="a short bio about yourself"
								value={this.state.bio}
								onChange={this.handleChange}
								fullWidth
								defaultValue="color"
								className={classes.root}
								InputProps={{
									className: classes.input,
								}}
								InputLabelProps={{
									className: classes.input,
								}}
							/>
							<TextField
								name="website"
								type="text"
								label="website"
								placeholder="your personal professional website"
								className={classes.textField}
								value={this.state.website}
								onChange={this.handleChange}
								fullWidth
								defaultValue="color"
								className={classes.root}
								InputProps={{
									className: classes.input,
								}}
								InputLabelProps={{
									className: classes.input,
								}}
							/>
							<TextField
								name="location"
								type="text"
								label="location"
								placeholder="where you live"
								className={classes.textField}
								value={this.state.location}
								onChange={this.handleChange}
								fullWidth
								defaultValue="color"
								className={classes.root}
								InputProps={{
									className: classes.input,
								}}
								InputLabelProps={{
									className: classes.input,
								}}
							/>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="secondary">
							Cancel
						</Button>
						<Button onClick={this.handleSubmit} color="secondary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	credentials: state.user.credentials,
});

EditDetails.propTypes = {
	editUserDetails: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { editUserDetails })(
	withStyles(styles)(EditDetails)
);
