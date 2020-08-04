import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ButtonTemplate from '../../util/ButtonTemplate';
import dayjs from 'dayjs';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
	...theme.etc,
	text: {
		color: '#959b9b',
	},
	profileImage: {
		margin: '20px',
		objectFit: 'cover',
		width: 200,
		height: 200,
		borderRadius: '50%',
		background: 'rgba(0,0,0, 0.5)',
	},
	dialogContent: {},
	dialogContentText: {
		color: '#959b9b',
		paddingTop: '5%',
		paddingLeft: '5%',
	},
	closeButton: {
		position: 'absolute',
		left: '90%',
		top: '5%',
		opacity: '50%',
	},
	expandButton: {
		position: 'absolute',
		left: '90%',
	},
	spinnerDiv: {
		textAlign: 'center',
		marginTop: 50,
		marginBottom: 50,
		opacity: 0.5,
	},
});

class ScreamDialog extends Component {
	state = {
		open: false,
		oldPath: '',
		newPath: '',
	};
	componentDidMount() {
		if (this.props.openDialog) {
			this.handleOpen();
		}
	}
	handleOpen = () => {
		let oldPath = window.location.pathname;

		const { userHandle, screamId } = this.props;
		const newPath = `/users/${userHandle}/scream/${screamId}`;

		if (oldPath === newPath) oldPath = `/users/${userHandle}`;

		window.history.pushState(null, null, newPath);

		this.setState({ open: true, oldPath, newPath });
		this.props.getScream(this.props.screamId);
	};
	handleClose = () => {
		window.history.pushState(null, null, this.state.oldPath);
		this.setState({ open: false });
		this.props.clearErrors();
	};

	render() {
		const {
			classes,
			scream: {
				screamId,
				body,
				createdAt,
				likeCount,
				commentCount,
				userImage,
				userHandle,
				comments,
			},
			UI: { loading },
		} = this.props;
		const likeCountData =
			likeCount === 1 ? <span>1 Like</span> : <span>{likeCount} Likes</span>;
		const commentCountData =
			commentCount === 1 ? (
				<span>1 Comment</span>
			) : (
				<span>{commentCount} Comments</span>
			);
		const dialogMarkup = loading ? (
			<div className={classes.spinnerDiv}>
				<CircularProgress size={150} thickness={2} color="secondary" />
			</div>
		) : (
			<Grid container spacing={16}>
				<Grid item sm={5}>
					<img src={userImage} alt="Profile" className={classes.profileImage} />
				</Grid>
				<Grid item sm={7} className={classes.dialogContentText}>
					<Typography
						component={Link}
						color="secondary"
						variant="h5"
						to={`/user/${userHandle}`}
					>
						@{userHandle}
					</Typography>
					<hr className={classes.invisibleSeperator} />
					<Typography variant="body2" className={classes.text}>
						{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
					</Typography>
					<hr className={classes.invisibleSeperator} />
					<Typography variant="body1" className={classes.text}>
						{body}
					</Typography>
					<LikeButton screamId={screamId} />
					{likeCountData}
					<ButtonTemplate tip="comments">
						<ChatIcon color="secondary" />
					</ButtonTemplate>
					{commentCountData}
				</Grid>
				<hr className={classes.visibleSeperator} />
				<CommentForm screamId={screamId} />
				<Comments comments={comments} />
			</Grid>
		);
		return (
			<Fragment>
				<ButtonTemplate
					onClick={this.handleOpen}
					tip="Expand scream"
					tipClassName={classes.expandButton}
				>
					<UnfoldMore color="secondary" />
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
					<DialogContent className={classes.dialogContent}>
						{dialogMarkup}
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

ScreamDialog.propTypes = {
	clearErrors: PropTypes.func.isRequired,
	getScream: PropTypes.func.isRequired,
	screamId: PropTypes.string.isRequired,
	userHandle: PropTypes.string.isRequired,
	scream: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	scream: state.data.scream,
	UI: state.UI,
});

const mapActionsToProps = {
	getScream,
	clearErrors,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(ScreamDialog));
