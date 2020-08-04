import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import ButtonTemplate from '../../util/ButtonTemplate';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';

import { connect } from 'react-redux';

const styles = (theme) => ({
	card: {
		position: 'relative',
		display: 'flex',
		marginBottom: 20,
		background: 'rgba(0,0,0, 0.3)',
		color: '#959b9b',
	},
	image: {
		minWidth: 175,
		objectFit: 'cover',
	},
	content: {
		padding: 25,
		objectFit: 'cover',
	},
});

class Scream extends Component {
	render() {
		dayjs.extend(relativeTime);
		const {
			classes,
			scream: {
				body,
				createdAt,
				userImage,
				userHandle,
				screamId,
				likeCount,
				commentCount,
			},
			user: {
				authenticated,
				credentials: { handle },
			},
		} = this.props;
		const deleteButton =
			authenticated && userHandle === handle ? (
				<DeleteScream screamId={screamId} />
			) : null;
		const likeCountData =
			likeCount === 1 ? <span>1 Like</span> : <span>{likeCount} Likes</span>;
		const commentCountData =
			commentCount === 1 ? (
				<span>1 Comment</span>
			) : (
				<span>{commentCount} Comments</span>
			);
		return (
			<Card className={classes.card}>
				<CardMedia
					image={userImage}
					title="Profile image"
					className={classes.image}
				/>
				<CardContent className={classes.content}>
					<Typography
						variant="h5"
						component={Link}
						to={`/users/${userHandle}`}
						color="secondary"
					>
						{userHandle}
					</Typography>
					{deleteButton}
					<br />
					<Typography variant="caption">
						{dayjs(createdAt).fromNow()}
					</Typography>
					<br />
					<Typography variant="body1">{body}</Typography>
					<LikeButton screamId={screamId} />
					{likeCountData}
					<ButtonTemplate tip="comments">
						<ChatIcon color="secondary" />
					</ButtonTemplate>
					{commentCountData}
					<ScreamDialog
						screamId={screamId}
						userHandle={userHandle}
						openDialog={this.props.openDialog}
					/>
				</CardContent>
			</Card>
		);
	}
}

Scream.propTypes = {
	user: PropTypes.object.isRequired,
	scream: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
