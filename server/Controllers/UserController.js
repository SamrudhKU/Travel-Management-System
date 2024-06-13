const asyncHandler = require("express-async-handler");


const User = require("../models/usermodel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//@desc Register a user
//@route POST /api/users/signin
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    console.log(username);
    console.log(password);
    if (!username || !password) {
        res.status(400).json({ message: "Username and password are required" });
    }

    //To check if username already exists
    const userAvailable = await User.findOne({ username });
    if (userAvailable) {
        res.status(400).json({ message: "Username already exists" });
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        password: hashedPassword
    });
    console.log(`User created ${user}`);

    if (user) {
        res.status(201).json({ _id: user.id, message: "Successfully created user" });
    } else {
        res.status(400).json({ message: "User not created" });
    }
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            User: {
                username: user.username,
            }
        },
            //secret access key
            process.env.ACCESS_TOKEN_SECERT,
            { expiresIn: "60m" }
        )
        console.log('user found');
        res.status(200).json({ accessToken });

    } else {
        console.log("not found");
        res.status(401).json({ message: "Invalid username or password" });
    }
}
)
module.exports = { registerUser, login };
