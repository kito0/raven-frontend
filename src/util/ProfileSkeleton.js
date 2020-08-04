import React from 'react';
import PropTypes from 'prop-types';
import noimg from '../images/noimg.png';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
	...theme.profile,
	handle: {
		height: 20,
		backgroundColor: theme.palette.secondary.main,
		width: 60,
		margin: '0 auto 7px auto',
	},
	fullLine: {
		height: 15,
		backgroundColor: 'rgba(0,0,0,0.6)',
		width: '100%',
		marginBottom: 10,
	},
	halfLine: {
		height: 15,
		backgroundColor: 'rgba(0,0,0,0.6)',
		width: '50%',
		marginBottom: 10,
	},
});

const ProfileSkeleton = (props) => {
	const { classes } = props;
	return (
		<Paper className={classes.paper}>
			<div className={classes.imageWrapper}>
				<img src={noimg} alt="profile" className={classes.profileImage} />
			</div>
			<p />
			<div className={classes.profileDetails}>
				<div className={classes.handle} />
				<p />
				<div className={classes.fullLine} />
				<div className={classes.fullLine} />
				<p />
				<LocationOn color="secondary" />
				<span>Location</span>
				<p />
				<LinkIcon color="secondary" />
				<span> https://website.com</span>
				<p />
				<CalendarToday color="secondary" /> <span> Date joined</span>
			</div>
		</Paper>
	);
};

ProfileSkeleton.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
