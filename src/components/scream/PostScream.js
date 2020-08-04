import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ButtonTemplate from '../../util/ButtonTemplate';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
	root: {
		background: 'transparent',
	},
	input: {
		color: '#959b9b',
	},
	submitButton: {
		position: 'relative',
		float: 'right',
		marginTop: '10',
	},
	progressSpinner: {
		position: 'absolute',
	},
	closeButton: {
		position: 'absolute',
		left: '90%',
		top: '5%',
		opacity: '50%',
	},
});

class PostScream extends Component {
	state = {
		open: false,
		body: '',
		errors: {},
	};
	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({
				errors: nextProps.UI.errors,
			});
		}
		if (!nextProps.UI.errors && !nextProps.UI.loading) {
			this.setState({ body: '', open: false, errors: {} });
		}
	}
	handleOpen = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false });
	};
	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	handleSubmit = (event) => {
		event.preventDefault();
		this.props.postScream({ body: this.state.body });
	};
	render() {
		const { errors } = this.state;
		const {
			classes,
			UI: { loading },
		} = this.props;
		return (
			<Fragment>
				<ButtonTemplate onClick={this.handleOpen} tip="Scream your thoughts">
					<AddIcon color="secondary" />
				</ButtonTemplate>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="sm"
					PaperProps={{
						style: {
							backgroundColor: 'rgba(0,0,0, 0.7)',
							boxShadow: '5px 10px 18px',
						},
					}}
				>
					<ButtonTemplate
						tip="Close"
						onClick={this.handleClose}
						tipClassName={classes.closeButton}
					>
						<CloseIcon color="secondary" />
					</ButtonTemplate>
					<DialogTitle style={{ color: '#5e3333' }}>Create Post</DialogTitle>
					<DialogContent>
						<form onSubmit={this.handleSubmit}>
							<TextField
								name="body"
								type="text"
								multiline
								rows="3"
								placeholder="Scream your thoughts"
								error={errors.body ? true : false}
								helperText={errors.body}
								onChange={this.handleChange}
								fullWidth
								className={classes.root}
								InputProps={{
									className: classes.input,
								}}
								InputLabelProps={{
									className: classes.input,
								}}
							/>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submitButton}
								disabled={loading}
							>
								Submit
								{loading && (
									<CircularProgress
										size={30}
										className={classes.progressSpinner}
									/>
								)}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

PostScream.propTypes = {
	postScream: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	UI: state.UI,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
	withStyles(styles)(PostScream)
);
