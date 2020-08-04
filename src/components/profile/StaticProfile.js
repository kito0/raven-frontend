import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
	...theme.profile,
});

const StaticProfile = (props) => {
	const {
		classes,
		profile: { handle, createdAt, imageUrl, bio, website, location },
	} = props;

	return (
		<Paper className={classes.paper}>
			<div>
				<div className={classes.imageWrapper}>
					<img src={imageUrl} alt="profile" className={classes.profileImage} />
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
			</div>
		</Paper>
	);
};

StaticProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
