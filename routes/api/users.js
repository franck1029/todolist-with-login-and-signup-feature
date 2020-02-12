const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const def = require('../../config/default.json');
const jwtSecret = def.jwtSecret;

//@route       POST api/users
//@description Register a user and generate a token
//@access      Public
router.post('/',[
	check('firstName', 'First Name is required')
	.not()
	.isEmpty(),
	check('lastName', 'Last Name is required')
	.not()
	.isEmpty(),
	check('email', 'Please enter a valid email')
	.isEmail(),
	check('password', 'Please enter a password with atleast 6 characters')
	.isLength({ min:6 })
	], async (req, res) => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
		};

		const { firstName, lastName, email, password } = req.body;

		try {
			//see if user exists
			let user = await User.findOne({ email });
			if(user) {
				return res.status(400).json({ errors: [{ msg: 'User already exists'}]});
			};

			user = new User({
				firstName,
				lastName,
				email,
				password
			});

			//encrypt the password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();


			//return a token
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (error, token) => {
				if(error) throw error;
				res.json({ token });
			});


		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		};


});

module.exports = router;








