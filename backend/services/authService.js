const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require('../models/authModel');

const registerUserService = async (firstName, lastName, email, password) => {
    const user = await Auth.create({
        firstName,
        lastName,
        email,
        password,
    });

    return user;
};

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const comparePassword = async (inputPassword, storedPasswordHash) => {
    return await bcrypt.compare(inputPassword, storedPasswordHash);
};

const generateToken = (user) => {
    return jwt.sign(
        {
            user: {
                email: user.email,
                id: user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
};

const loginUserService = async (email, password) => {
    const user = await Auth.findOne({ email });

    if (user && await comparePassword(password, user.password)) {
        const accessToken = generateToken(user);
        return { accessToken, user };
    }

    return null;
};


const getUserByEmailService = async (email) => {
    try {
        const user = await Auth.findOne({ email: email });
        return user ? user : null;
    } catch (error) {
        throw error;
    }
};

module.exports = { registerUserService, loginUserService, getUserByEmailService, hashPassword, generateToken };
