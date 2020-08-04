import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
	...theme.etc,
	frag: {
		background: 'rgba(0,0,0,0.1)',
	},
	commentImage: {
		maxWidth: '100%',
		height: 100,
		objectFit: 'cover',
		borderRadius: '50%',
	},
	commentData: {
		color: '#959b9b',
		marginLeft: 20,
	},
});

class Comments extends Component {
	render() {
		const { comments, classes } = this.props;
		return (
			<Grid container>
				{comments.map((comment, index) => {
					const { body, createdAt, userImage, userHandle } = comment;
					return (
						<Fragment key={createdAt} className={classes.frag}>
							<Grid item sm={12}>
								<Grid container>
									<Grid item sm={2}>
										<img
											src={userImage}
											alt="comment"
											className={classes.commentImage}
										/>
									</Grid>
									<Grid item sm={9}>
										<div className={classes.commentData}>
											<Typography
												variant="h5"
												component={Link}
												to={`/users/${userHandle}`}
												color="secondary"
											>
												{userHandle}
											</Typography>
											<Typography variant="body2" color="#959b9b">
												{dayjs(createdAt).format(`h:mm a, MMMM DD YYYY`)}
											</Typography>
											<hr className={classes.invisibleSeperator} />
											<Typography variant="body1">{body}</Typography>
										</div>
									</Grid>
								</Grid>
							</Grid>
							{index !== comments.length - 1 && (
								<hr className={classes.visibleSeperator} />
							)}
						</Fragment>
					);
				})}
			</Grid>
		);
	}
}

Comments.propTypes = {
	comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comments);
