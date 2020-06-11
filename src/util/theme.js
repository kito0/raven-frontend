export default {
	a: {
		textDecoration: "none",
	},
	palette: {
		primary: {
			light: "#1c1c1c",
			main: "#1c1c1c",
			dark: "#1c1c1c",
			contrastText: "#5f6662",
		},
		secondary: {
			light: "#5f6662",
			main: "#5f6662",
			dark: "#5f6662",
			contrastText: "#5f6662",
		},
	},
	typography: {
		useNextVariants: true,
	},
	formStyle: {
		form: {
			textAlign: "center",
		},
		image: {
			margin: "20px auto 20px auto",
		},
		pageTitle: {
			margin: "10px auto 10px auto",
		},
		textField: {
			margin: "5px auto 5px auto",
		},
		button: {
			marginTop: 20,
			position: "relative",
		},
		root: {
			"&$error": {
				color: "#54100a",
			},
		},
		asterisk: {
			"&$error": {
				color: "#54100a",
			},
		},
		underline: {
			"&$error:after": {
				borderBottomColor: "#54100a",
			},
		},
		error: {},
		customError: {
			color: "#54100a",
			fontSize: "0.8rem",
		},
		progress: {
			position: "absolute",
			width: "50%",
		},
	},
};
