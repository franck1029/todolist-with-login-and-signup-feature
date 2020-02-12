const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const def = require('../../config/default.json');
const jwtSecret = def.jwtSecret;
const auth = require('../../middleware/auth')



// @route       GET api/auth
// description: Test route
// @access      Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


//@route       POST api/auth
//@description Login a user and generate a token
//@access      Public

router.post('/',[
	check('email', 'Please enter a valid email')
	.isEmail(),
	check('password', 'Password is required')
	.exists()
	], async (req, res) => {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
		};

		const { email, password } = req.body;

		try {
			//see if user exists
			let user = await User.findOne({ email });
			if(!user) {
				return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}]});
			};

			//verify the password
			const isMatch = await bcrypt.compare(password, user.password);
			if(!isMatch) {
				return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}]});
			}


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

