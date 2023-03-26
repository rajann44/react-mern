const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const JWT_SECRET = "secret_token_for_react_mern_auth";

//Create a user using: POST "/api/auth/createuser" (Require no auth / No Login required)
router.post(
	"/createuser",
	[
		body("email", "Enter Valid Email...").isEmail(),
		body("name", "Name should be atleast 3 char.").isLength({ min: 3 }),
		body("password", "Password must be 5 character").isLength({ min: 5 }),
	],
	async (req, res) => {
		// If Errors return Bad request and error
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(403).json({ errors: errors.array() });
		}

		try {
			//Check whether email exists already
			let user = await Users.findOne({ email: req.body.email });
			if (user) {
				return res.status(403).json("Sorry, but this user already exists!");
			}

			//Generate slat and secure password
			const salt = bcrypt.genSaltSync(10);
			const securePassword = await bcrypt.hash(req.body.password, salt);

			//Create new user
			user = await Users.create({
				name: req.body.name,
				password: securePassword,
				email: req.body.email,
			});

			const data = {
				user: { id: user.id },
			};
			const authToken = jwt.sign(data, JWT_SECRET);
			//console.log(authToken);

			//res.json({ message: "User Created Successfully.", user });
			res.json({ authToken, email: user.email });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error Occured :(");
		}
	}
);

//Authenticate a user using: POST "/api/auth/login" (Require no auth / No Login required)
router.post(
	"/login",
	[
		body("email", "Enter Valid Email...").isEmail(),
		body("password", "Password cannot be blank...").exists(),
	],
	async (req, res) => {
		// If Errors return Bad request and error
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(403).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await Users.findOne({ email });
			if (!user) {
				return res.status(403).json({ error: "Email Or Password incorrect" });
			}
			const passwordComparisonResult = await bcrypt.compare(
				password,
				user.password
			);
			if (!passwordComparisonResult) {
				return res.status(403).json({ error: "Email Or Password incorrect" });
			}

			const data = {
				user: {
					id: user.id,
				},
			};
			const authToken = jwt.sign(data, JWT_SECRET);
			res.json({ authToken, email: user.email });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error Occured :(");
		}
	}
);

module.exports = router;
