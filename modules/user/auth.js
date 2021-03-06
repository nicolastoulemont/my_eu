const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const AuthUser = req => {
	const accessToken = req.headers.accesstoken || '';
	const refreshToken = req.headers.refreshtoken || '';

	if (!accessToken && !refreshToken) return;

	if (accessToken) {
		try {
			const user = jwt.verify(accessToken, process.env.SECRET);
			return user;
		} catch {
			if (!refreshToken) return;

			let data;
			try {
				data = jwt.verify(refreshToken, process.env.SECRET2);
				return {
					needTokens: true,
					...data
				};
			} catch {
				return;
			}
		}
	}
};

const createTokens = user => {
	const accessToken = jwt.sign(
		{
			id: user._id,
			access: user.access
		},
		process.env.SECRET,
		{ expiresIn: '20min' }
	);

	const refreshToken = jwt.sign(
		{
			id: user._id,
			access: user.access
		},
		process.env.SECRET2,
		{ expiresIn: '7d' }
	);

	return { accessToken, refreshToken };
};

const sendVerificationEmail = user => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.privateemail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_SENDER.toString(),
			pass: process.env.EMAIL_PWD.toString()
		},
		tls: { rejectUnauthorized: false }
	});

	const emailToken = jwt.sign({ id: user.id }, process.env.EMAIL_SECRET, { expiresIn: '1d' });

	let emailVerificationUrl;

	if (process.env.NODE_ENV === 'production') {
		emailVerificationUrl = `https://my-eu.eu/confirmation/${emailToken}`;
	} else {
		emailVerificationUrl = `http://localhost:3000/confirmation/${emailToken}`;
	}

	const emailHtml = `
		<!DOCTYPE html>
		<html>
			<head>
				<style>
					body {
						font-size: 1rem;
						font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
						padding: 10px;
					}
		
					h3 {
						font-weight: bold;
						font-size: 1.75rem;
						color: #4f96d5;
						margin: 1rem;
					}
					h4 {
						font-weight: bold;
						font-size: 1.5rem;
						color: rgb(99, 95, 95);
						margin: 1rem;
					}
					p {
						margin: 1rem;
						font-weight: bold;
						color: rgb(99, 95, 95);
					}
		
					a {
						text-decoration: none;
						font-weight: bold;
						color: #4f96d5;
					}
				</style>
			</head>
			<body>
				<h3>MyEU</h3>
				<h4>Email confirmation</h4>
				<p>
					Please follow this link to confirm your email address :
					<a href="${emailVerificationUrl}">Confirm your email</a>
				</p>
				<p>Thank you for registering to MyEU.</p>
				<p>The MyEU Team</p>
	
			</body>
		</html>
		
		`;

	transporter
		.sendMail({
			from: 'MyEU Contact <contact@my-eu.eu>',
			to: user.email,
			subject: 'MyEU Email verification',
			html: emailHtml
		})
		.catch(err => console.log(err.message));
};

const sendEventPublicVerificationEmail = (user, event) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.privateemail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_SENDER.toString(),
			pass: process.env.EMAIL_PWD.toString()
		},
		tls: { rejectUnauthorized: false }
	});

	const publicEventToken = jwt.sign({ id: user.id, event_ID: event.id }, process.env.EMAIL_SECRET, {
		expiresIn: '1d'
	});

	let publicEventVerificationUrl;
	if (process.env.NODE_ENV === 'production') {
		publicEventVerificationUrl = `https://my-eu.eu/confirmation/${publicEventToken}`;
	} else {
		publicEventVerificationUrl = `http://localhost:3000/confirmation/${publicEventToken}`;
	}

	const emailHtml = `
	<!DOCTYPE html>
	<html>
		<head>
			<style>
				body {
					font-size: 1rem;
					font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
					padding: 10px;
				}
	
				h3 {
					font-weight: bold;
					font-size: 1.75rem;
					color: #4f96d5;
					margin: 1rem;
				}
				h4 {
					font-weight: bold;
					font-size: 1.5rem;
					color: rgb(99, 95, 95);
					margin: 1rem;
				}
				p {
					margin: 1rem;
					font-weight: bold;
					color: rgb(99, 95, 95);
				}
	
				a {
					text-decoration: none;
					font-weight: bold;
					color: #4f96d5;
				}
			</style>
		</head>
		<body>
			<h3>MyEU</h3>
			<h4>Registration confirmation</h4>
			<p>
				Please follow this link to confirm your registration to ${event.name}:
				<a href="${publicEventVerificationUrl}">Confirm your Registration</a>
			</p>
			<p>Thank you for registering</p>
			<p>We hope you enjoy ${event.name}</p>
			<p>The MyEU Team</p>
		</body>
	</html>
	
	`;

	transporter
		.sendMail({
			from: 'MyEU Contact <contact@my-eu.eu>',
			to: user.email,
			subject: `Confirmation of your registration to ${event.name}`,
			html: emailHtml
		})
		.catch(err => console.log(err.message));
};

const sendForgotPwdEmail = (user, email) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.privateemail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_SENDER2.toString(),
			pass: process.env.EMAIL_PWD2.toString()
		},
		tls: { rejectUnauthorized: false }
	});

	const resetPwdEmailToken = jwt.sign({ id: user.id }, process.env.EMAIL_SECRET, {
		expiresIn: '1h'
	});
	let resetPwdUrl;
	if (process.env.NODE_ENV === 'production') {
		resetPwdUrl = `https://my-eu.eu/reset_password/${resetPwdEmailToken}`;
	} else {
		resetPwdUrl = `http://localhost:3000/reset_password/${resetPwdEmailToken}`;
	}

	const emailHtml = `
	<!DOCTYPE html>
	<html>
		<head>
			<style>
				body {
					font-size: 1rem;
					font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
					padding: 10px;
				}
	
				h3 {
					font-weight: bold;
					font-size: 1.75rem;
					color: #4f96d5;
					margin: 1rem;
				}
				h4 {
					font-weight: bold;
					font-size: 1.5rem;
					color: rgb(99, 95, 95);
					margin: 1rem;
				}
				p {
					margin: 1rem;
					font-weight: bold;
					color: rgb(99, 95, 95);
				}
	
				a {
					text-decoration: none;
					font-weight: bold;
					color: #4f96d5;
				}
			</style>
		</head>
		<body>
			<h3>MyEU</h3>
			<h4>Request for password reset</h4>
			<p>
				Please follow this link to reset your password :
				<a href="${resetPwdUrl}">Reset your Password</a>
			</p>
			<p>The MyEU Team</p>
		</body>
	</html>
	
	`;

	transporter
		.sendMail({
			from: 'MyEU Support <support@my-eu.eu>',
			to: email,
			subject: 'Request for password reset',
			html: emailHtml
		})
		.catch(err => console.log(err.message));
};

module.exports = {
	AuthUser,
	createTokens,
	sendVerificationEmail,
	sendEventPublicVerificationEmail,
	sendForgotPwdEmail
};
