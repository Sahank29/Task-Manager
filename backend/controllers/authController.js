const asyncHandler = require("express-async-handler");
const Auth = require('../models/authModel');
const { emailValidator, passwordValidator } = require('../utils/validators');
const { registerUserService, loginUserService, getUserByEmailService, hashPassword, generateToken } = require('../services/authService');

//@desc Register a user
//@route POST /api/cred/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

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

        const hashedPassword = await hashPassword(password);
        const user = await registerUserService(firstName, lastName, email, hashedPassword);

        if (user) {
            res.status(200).json({ status: 104 });
        } else {
            res.status(200).json({ status: 101, message: "Failed to register user" });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Problem from the Server. Please try again later' });
    }
});


//@desc Login user
//@route POST /api/cred/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    try {
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
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Problem from the Server. Please try again later' });
    }
});

//@desc Google login/register user
//@route POST /api/cred/google-login
//@access public
const googleUser = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;

        let user = await getUserByEmailService(email);

        if (!user) {
            user = await registerUserService(firstName, lastName, email);

            const token = generateToken(user);

            return res.status(201).json({ status: 104, cred: token });
        } else {
            const token = generateToken(user);
            return res.status(200).json({ status: 104, cred: token });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Problem from the Server. Please try again later' });
    }
});


module.exports = { registerUser, loginUser, googleUser };