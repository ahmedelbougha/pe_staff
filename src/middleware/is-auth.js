require('dotenv').config();

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // get the token from the Authorization header
    const authorizationHeader = req.get("Authorization");
    if (!authorizationHeader) {
        const error = new Error("Not authenticated!");
        error.statusCode = 401;
        throw error;
    }
    // the header format is "Bearer token-long-string"
    // split the token into an array of strings and get second element that contains the token
    const token = authorizationHeader.split(" ")[1];
    let decodedToken;
    try {
        //decode the token and get the user data
        decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 401;
        }
        throw error;
    }
    if (!decodedToken) {
        const error = new Error("Incorrect token!");
        error.statusCode = 401;
        throw error;
    }

    next();
};
