import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import ButtonTemplate from '../util/ButtonTemplate';
import DeleteScream from './DeleteScream';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

const styles = (theme) => ({
	...theme.screamStyle,
});

class Scream extends Component {
	likedScream = () => {
		if (
			this.props.user.likes &&
			this.props.user.likes.find(
				(like) => like.screamId === this.props.scream.screamId
			)
		)
			return true;
		else return false;
	};
	likeScream = () => {
		this.props.likeScream(this.props.scream.screamId);
	};
	unlikeScream = () => {
		this.props.unlikeScream(this.props.scream.screamId);
	};
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
		const likeButton = !authenticated ? (
			<ButtonTemplate tip="Like">
				<Link to="/login">
					<FavoriteBorder color="secondary" />
				</Link>
			</ButtonTemplate>
		) : this.likedScream() ? (
			<ButtonTemplate tip="Undo Like" onClick={this.unlikeScream}>
				<FavoriteIcon color="secondary" />
			</ButtonTemplate>
		) : (
			<ButtonTemplate tip="Like" onClick={this.likeScream}>
				<FavoriteBorder color="secondary" />
			</ButtonTemplate>
		);
		const deleteButton =
			authenticated && userHandle === handle ? (
				<DeleteScream screamId={screamId} />
			) : null;
		return (
			<Card className={classes.card}>
				<CardMedia
					image={userImage}
					title="profile image"
					className={classes.image}
				/>
				<CardContent className={classes.content}>
					<Typography variant="h5" component={Link} to={`/users/${userHandle}`}>
						{userHandle}
					</Typography>
					{deleteButton}
					<br />
					<Typography variant="caption">
						{dayjs(createdAt).fromNow()}
					</Typography>
					<br />
					<Typography variant="body1">{body}</Typography>
					{likeButton}
					<span>{likeCount} Likes</span>
					<ButtonTemplate tip="comments">
						<ChatIcon color="secondary" />
					</ButtonTemplate>
				</CardContent>
			</Card>
		);
	}
}

Scream.propTypes = {
	user: PropTypes.object.isRequired,
	scream: PropTypes.object.isRequired,
	likeScream: PropTypes.func.isRequired,
	unlikeScream: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapActionsToProps = {
	likeScream,
	unlikeScream,
};

export default connect(mapStateToProps)(withStyles(styles)(Scream));
