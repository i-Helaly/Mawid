
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const jsend = require("../utils/jsend");

const verify = async (req, res, next) => {
    const headers =
        req.headers["Authorization"] || req.headers["authorization"];

    if (!headers) {
        return res.status(401).json("Token not found");
    }

    const token = headers.split(" ")[1];

    try {
        const checkToken = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );

        const user = await User.findById(checkToken.userId);

        if (!user) {
            return res.status(401).json({
                status: jsend.FAIL,
                data: "User not found"
            });
        }

        if (user.isBlocked) {
            return res.status(403).json({
                status: jsend.FAIL,
                data: "Your account has been blocked"
            });
        }

        req.user = checkToken;
        next();

    } catch (err) {
        return res.status(401).json("Unauthorized");
    }
};

module.exports = verify;
