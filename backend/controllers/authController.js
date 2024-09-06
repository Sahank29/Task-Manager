const asyncHandler = require("express-async-handler");
const Auth = require('../models/authModel');
const { emailValidator, passwordValidator } = require('../utils/validators');
const { registerUserService } = require('../services/authService');

//@desc Register a user
//@route POST /cred/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!emailValidator(email)) {
        return res.status(200).json({ status: 102, message: "Invalid email format" });
    }

    if (!passwordValidator(password)) {
        return res.status(200).json({ status: 102, message: "Password must be at least 8 characters long, with one uppercase letter and one number" });
    }

    const userAvailable = await Auth.findOne({ email });
    if (userAvailable) {
        return res.status(200).json({ status: 103, message: "User already exists" });
    }

    const user = await registerUserService(email, password);

    if (user) {
        res.status(200).json({ status: 104 });
    } else {
        res.status(200).json({ status: 101, message: "Failed to register user" });
    }
});


//@desc Login user
//@route POST /cred/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!emailValidator(email) || !passwordValidator(password)) {
        return res.status(200).json({ status: 107, message: "Invalid email or password" });
    }

    const result = await loginUserService(email, password);

    if (result) {
        res.status(200).json({ status: 106, cred: result.accessToken });
    } else {
        res.status(200).json({ status: 105, message: "Invalid credentials" });
    }
});


module.exports = { registerUser, loginUser };