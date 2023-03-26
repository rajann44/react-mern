var jwt = require("jsonwebtoken");
const JWT_SECRET = "secret_token_for_react_mern_auth";

fetchuser = (req, res, next) => {
	//Get user from jwt token and add id to request object
	const token = req.header("auth-token");
	if (!token) {
		res.status(401).send({ error: "Please authenticate using valid token" });
	}

	try {
		const validatedData = jwt.verify(token, JWT_SECRET);
		req.user = validatedData.user;
		next();
	} catch (error) {
		res.status(401).send({ error: "Please authenticate using valid token" });
	}
};

module.exports = fetchuser;
