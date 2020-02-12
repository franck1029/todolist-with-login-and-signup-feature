const mongoose = require('mongoose');
const def = require('./default.json');
const db = def.mongoURI;

const connectDB = async () => {
	try	{
		await mongoose.connect(db, {
			useUnifiedTopology: true,
			useCreateIndex: true,
			useNewUrlParser: true,
			useFindAndModify: false
		});

		console.log('MongoDB Connected')

	} catch (err) {
		console.error(err.message);
		process.exit(1);
	};
};

module.exports = connectDB;