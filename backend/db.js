const mongoose = require("mongoose");
const mongouri = "mongodb://127.0.0.1/react-local-db";

const connectToMongo = async () => {
	mongoose.connect(mongouri).then(() => {
		console.log("MongoDB is connected successfully!!");
	});
};

module.exports = connectToMongo;
