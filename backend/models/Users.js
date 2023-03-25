const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsersSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Users = mongoose.model("users", UsersSchema);
//Users.createIndexes(); - Will handle unique email in auth.js
module.exports = Users;
