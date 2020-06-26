import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ButtonTemplate from '../util/ButtonTemplate';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';

const styles = {
	deleteButton: {
		position: 'absolute',
		top: '10%',
		left: '90%',
		opacity: '0.5',
	},
};

class DeleteScream extends Component {
	state = {
		open: false,
	};
	handleOpen = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false });
	};
	deleteScream = () => {
		this.props.deleteScream(this.props.screamId);
		this.setState({ open: false });
	};
	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<ButtonTemplate
					tip="Delete scream"
					onClick={this.handleOpen}
					btnClassName={classes.deleteButton}
				>
					<DeleteOutline color="secondary" />
				</ButtonTemplate>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
					PaperProps={{
						style: {
							backgroundColor: 'rgba(0, 0, 0, 0.1)',
							boxShadow: '5px 10px 18px',
						},
					}}
				>
					<DialogTitle style={{ color: '#5e3333' }}>
						Are you sure you want to delete this scream?
					</DialogTitle>
					<DialogActions>
						<Button onClick={this.handleClose} color="secondary">
							Cancel
						</Button>
						<Button onClick={this.deleteScream} color="secondary">
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

DeleteScream.propTypes = {
	deleteScream: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	screamId: PropTypes.object.isRequired,
};

export default connect(null, { deleteScream })(
	withStyles(styles)(DeleteScream)
);
