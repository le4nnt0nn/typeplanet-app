const jwt = require("jsonwebtoken");

// full middleware function with next
module.exports = function (req, res, next) {
    // get token from header
    const token = req.header('x-auth-token');

    // token exists ?
    // 401 Unauthorized
    if (!token) {
        return res.status(401).json({ msg: 'Authorization denied. Token missing.' });
    }

    // token exists in header, then verify token
    try {
        // verify token and next()
        const decoded = jwt.verify(token, 'mysecrettoken:P');
        req.user = decoded.user;
        next();
    } catch (err) {
        // token not valid
        res.status(401).json({ msg: 'Authorization denied. Token not valid.' });
    }
};