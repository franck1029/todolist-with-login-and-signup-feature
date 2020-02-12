const jwt = require('jsonwebtoken');
const def = require('../config/default.json');
const jwtSecret = def.jwtSecret;

module.exports = function (req, res, next) {
	//get token
	const token = req.header('x-auth-token');
	//see if there's a token
	if(!token) {
		return res.status(401).json({ msg: 'No token, Authorization denied'});
	};

	//verify token
	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.user = decoded.user;
		next()
	} catch (err) {
		res.status(401).json({ msg: 'Invalid token'})
	}
};