
const asyncHandler = require("express-async-handler");


require('dotenv').config({ path: '../config/.env' });
const jwt = require('jsonwebtoken')


//@desc Login a user
//@route POST /api/users/login
//@access public
const adminlogin = asyncHandler(async (req, res) => {

    const { username, password } = req.body

    console.log("username:", username, password)
    console.log("username:", process.env.username, process.env.password)
    if (username == process.env.USERNAME1 && password == process.env.PASSWORD) {
        const AdminaccessToken = jwt.sign({
            User: {
                username: username
            }
        },
            //secret access key
            process.env.ACCESS_TOKEN_SECERT,
            { expiresIn: "10m" }
        )
        console.log('user found');
        res.status(200).json({ AdminaccessToken });

    } else {
        console.log("User is not Authenticated");
        res.status(401).json({ message: "Invalid username or password" });
    }
}
)

module.exports = { adminlogin };