const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401);
            console.log("User is not authorized or token is missing");
            res.end()
        }

        await jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
            if (err) {
                res.status(401);
                res.end("User is not authorized");
            }
            req.user = decoded; // Assign the entire decoded token to req.user
            console.log("Decoded token:", decoded, "User:", req.user); // Log the decoded token
            next();
        });


    }

})
module.exports = validateToken;
