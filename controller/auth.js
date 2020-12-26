const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {
        const rawToken = req.headers.authorization.split(" ")[1];
        const decToken =  jwt.verify(rawToken, "mysecret");
        req.body.name = decToken.name;
        next();
    } catch {
        return res.status(401).json({message:"Not authorized"});
    }
}