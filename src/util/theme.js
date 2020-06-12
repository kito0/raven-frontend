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
};
