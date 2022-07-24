require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		// simplified authentication using static email and password from environment file .env
		const hashPass = await bcrypt.hash(process.env.PASSWORD, 12);
		const arePasswordsEqual = await bcrypt.compare(password, hashPass);

		// Throw error if email or password are not correct
		if (email !== process.env.EMAIL || !arePasswordsEqual) {
			const error = new Error('Invalid email or password!');
			error.statusCode = 401;
			throw error;
		}

		// Create JWT token with simple data (email) that expires in 1 hour
		const token = jwt.sign({ email: email }, process.env.SECRET_TOKEN, { expiresIn: '1h' });

		// Return success message with response 200 OK
		res.status(200).json({
			message: 'Login Successfully',
			name: process.env.USER,
			token: token
		});

		return;
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 500;
		}

		next(error);
		return error;
	}
};
