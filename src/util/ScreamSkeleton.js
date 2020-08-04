import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import noimg from '../images/noimg.png';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = (theme) => ({
	card: {
		position: 'relative',
		display: 'flex',
		marginBottom: 20,
		background: 'rgba(0,0,0, 0.3)',
	},
	cover: {
		minWidth: 175,
		objectFit: 'cover',
	},
	cardContent: {
		width: '100%',
		flexDirection: 'column',
		padding: 25,
	},
	handle: {
		width: 60,
		height: 20,
		backgroundColor: theme.palette.secondary.main,
		marginTop: 10,
		marginBottom: 7,
	},
	date: {
		height: 14,
		width: 100,
		background: 'rgba(0,0,0, 0.5)',
		marginBottom: 10,
	},
	halfLine: {
		height: 15,
		width: '50%',
		background: 'rgba(0,0,0, 0.6)',
		marginBottom: 10,
	},
	fullLine: {
		height: 15,
		width: 500,
		background: 'rgba(0,0,0, 0.6)',
		marginBottom: 10,
	},
});

const ScreamSkeleton = (props) => {
	const { classes } = props;

	const content = Array.from({ length: 5 }).map((item, index) => (
		<Card className={classes.card} key={index}>
			<CardMedia className={classes.cover} image={noimg} />
			<CardContent className={classes.CardContent}>
				<div className={classes.handle} />
				<div className={classes.date} />
				<div className={classes.fullLine} />
				<div className={classes.fullLine} />
				<div className={classes.halfLine} />
			</CardContent>
		</Card>
	));

	return <Fragment>{content}</Fragment>;
};

ScreamSkeleton.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScreamSkeleton);
