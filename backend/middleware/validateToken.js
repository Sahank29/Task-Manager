const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.cookie;
  if (authHeader) {
    const cookies = authHeader.split(";").map(cookie => cookie.trim());
    const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));

    if (tokenCookie) {
      token = tokenCookie.split("=")[1];
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }

});

module.exports = validateToken;