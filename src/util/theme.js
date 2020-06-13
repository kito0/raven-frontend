export default {
	a: {
		textDecoration: 'none',
	},
	palette: {
		primary: {
			light: '#1f1f1f',
			main: '#1f1f1f',
			dark: '#1f1f1f',
			contrastText: '#959b9b',
		},
		secondary: {
			light: '#959b9b',
			main: '#5eada8',
			dark: '#959b9b',
			contrastText: '#959b9b',
		},
	},
	typography: {
		useNextVariants: true,
	},
	paper: {
		padding: 20,
	},
	invisibleSeparator: {
		border: 'none',
		margin: 4,
	},
	visibleSeparator: {
		width: '100%',
		borderBottom: '1px solid rgba(0,0,0,0.1)',
		marginBottom: 20,
	},
	formStyle: {
		form: {
			textAlign: 'center',
		},
		image: {
			margin: '20px auto 20px auto',
		},
		pageTitle: {
			margin: '10px auto 10px auto',
		},
		textField: {
			margin: '5px auto 5px auto',
		},
		button: {
			marginTop: 20,
			position: 'relative',
		},
		root: {
			'&$error': {
				color: '#54100a',
			},
		},
		asterisk: {
			'&$error': {
				color: '#54100a',
			},
		},
		underline: {
			'&$error:after': {
				borderBottomColor: '#54100a',
			},
		},
		error: {},
		customError: {
			color: '#54100a',
			fontSize: '0.8rem',
		},
		progress: {
			position: 'absolute',
			width: '50%',
		},
	},
	screamStyle: {
		card: {
			position: 'relative',
			display: 'flex',
			marginBottom: 20,
			background: '#343636',
			color: '#959b9b',
		},
		image: {
			minWidth: 150,
		},
		content: {
			padding: 25,
			objectFit: 'cover',
		},
	},
	profile: {
		paper: {
			padding: 20,
			background: '#343636',
		},
		imageWrapper: {
			textAlign: 'center',
			position: 'relative',
			'& button': {
				position: 'absolute',
				top: '80%',
				left: '70%',
			},
			background: '#343636',
		},
		profileImage: {
			margin: '20px',
			width: 200,
			height: 200,
			borderRadius: '50%',
			background: '#343636',
		},
		profileDetails: {
			background: '#343636',
			textAlign: 'center',
			'& span, svg': {
				verticalAlign: 'middle',
			},
			'& a': {
				color: '#959b9b',
			},
		},
		svgButton: {
			background: '#343636',
			'&:hover': {
				cursor: 'pointer',
			},
		},
		noProfile: {
			padding: 20,
		},
		buttons: {
			textAlign: 'center',
			'& a': {
				margin: '10px 20px 10px 20px',
			},
		},
	},
};