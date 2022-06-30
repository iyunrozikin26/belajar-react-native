const { sign, verify } = require("jsonwebtoken");

module.exports = {
    signToken: (payload) => sign(payload, "rahasia"),
    verifyToken: (token) => verify(token, "rahasia"),
};
