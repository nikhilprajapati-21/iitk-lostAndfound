const jwt = require("jsonwebtoken");

const generateToken = (email, rollNo) => {
    return jwt.sign(
        {
            email,
            rollNo,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

module.exports = generateToken;