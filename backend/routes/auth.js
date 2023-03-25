const express = require("express");
const Users = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");

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
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			let user = await Users.findOne({ email: req.body.email });
			if (user) {
				return res.status(403).json("Sorry, but this user already exists!");
			}

			//Check whether email exists already
			user = await Users.create({
				name: req.body.name,
				password: req.body.password,
				email: req.body.email,
			});

			//.then((user) => res.json(user))
			//.catch((err) => {
			//	console.log(err);
			//	res.json({ error: "Enter a unqiue email", message: err.message });
			//});

			//console.log(req.body);
			//const user = Users(req.body);
			//user.save();
			//res.send(req.body)
			res.json({ message: "User Created Successfully.", user });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Some Error Occured :(");
		}
	}
);

module.exports = router;
