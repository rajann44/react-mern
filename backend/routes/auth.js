const express = require("express");
const Users = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//Create a user using: POST "/api/auth/" (Require no auth)
router.post(
	"/",
	[
		body("email", "Enter Valid Email...").isEmail(),
		body("name", "Name should be atleast 3 char.").isLength({ min: 3 }),
		body("password", "Password must be 5 character").isLength({ min: 5 }),
	],
	(req, res) => {
		// Finds the validation errors in this request and wraps them in an object with handy functions
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		Users.create({
			name: req.body.name,
			password: req.body.password,
			email: req.body.email,
		})
			.then((user) => res.json(user))
			.catch((err) => {
				console.log(err);
				res.json({ error: "Enter a unqiue email", message: err.message });
			});

		//console.log(req.body);
		//const user = Users(req.body);
		//user.save();
		//res.send(req.body)
	}
);

module.exports = router;
