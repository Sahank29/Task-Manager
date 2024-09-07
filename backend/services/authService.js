const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require('../models/authModel');

const registerUserService = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Auth.create({
        email,
        password: hashedPassword,
    });

    return user;
};

const loginUserService = async (email, password) => {
    const user = await Auth.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
            {
                user: {
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        return { accessToken, user };
    }

    return null;
};

module.exports = { registerUserService, loginUserService };
