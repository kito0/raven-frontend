import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import ButtonTemplate from '../../util/ButtonTemplate';
import ProfileSkeleton from '../../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

const styles = (theme) => ({
	...theme.profile,
});

class Profile extends Component {
	handleImageChange = (event) => {
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append('image', image, image.name);
		this.props.uploadImage(formData);
	};
	handleEditPicture = () => {
		const fileInput = document.getElementById('imageInput');
		fileInput.click();
	};
	handleLogout = () => {
		this.props.logoutUser();
	};
	render() {
		const {
			classes,
			user: {
				credentials: { handle, createdAt, imageUrl, bio, website, location },
				loading,
				authenticated,
			},
		} = this.props;

		let profileMarkup = !loading ? (
			authenticated ? (
				<Paper className={classes.paper}>
					<div>
						<div className={classes.imageWrapper}>
							<img
								src={imageUrl}
								alt="profile"
								className={classes.profileImage}
							/>
							<input
								type="file"
								id="imageInput"
								hidden="hidden"
								onChange={this.handleImageChange}
							/>
							<ButtonTemplate
								tip="Edit profile picture"
								onClick={this.handleEditPicture}
								btnClassName="button"
							>
								<EditIcon color="secondary" />
							</ButtonTemplate>
						</div>
						<p />
						<div className={classes.profileDetails}>
							<Typography variant="h5" component={Link} to={`/users/${handle}`}>
								@{handle}
							</Typography>
							<p />
							{bio && <Typography variant="body2">{bio}</Typography>}
							<p />
							{location && (
								<Fragment>
									<LocationOn color="secondary" />
									<span>{location}</span>
								</Fragment>
							)}
							<p />
							{website && (
								<Fragment>
									<LinkIcon color="secondary" />
									<a href={website} target="_blank" rel="noopener noreferrer">
										{' '}
										{website}
									</a>
									<p />
								</Fragment>
							)}
							<CalendarToday color="secondary" />{' '}
							<span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
						</div>
						<ButtonTemplate tip="Logout" onClick={this.handleLogout}>
							<KeyboardReturn color="secondary" />
						</ButtonTemplate>
						<EditDetails />
					</div>
				</Paper>
			) : (
				<Paper className={classes.paper}>
					<Typography
						variant="body2"
						align="center"
						className={classes.noProfile}
					>
						No profile found, please login
					</Typography>
					<div className={classes.buttons}>
						<Button
							variant="contained"
							color="primary"
							component={Link}
							to="/login"
						>
							Login
						</Button>
						<Button
							variant="contained"
							color="primary"
							component={Link}
							to="/signup"
						>
							Signup
						</Button>
					</div>
				</Paper>
			)
		) : (
			<ProfileSkeleton />
		);

		return profileMarkup;
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Profile));
