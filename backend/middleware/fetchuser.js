const jwt = require('jsonwebtoken');
const JWT_secret = 'AliRazakia#hall$ha';

const fetchuser = (req, res, next) => {
    // Get token from request header
    const token = req.header('auth-token');  //  Use 'auth-token' (consistent with frontend)

    if (!token) {
        return res.status(401).json({ error: 'Access denied! No token provided.' });
    }

    try {
        const data = jwt.verify(token, JWT_secret); //  Verify token
        req.user = data.user; //  Attach user data to `req.user`
        next(); //  Only call `next()` if verification is successful
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token! Access denied.' });
    }
};

module.exports = fetchuser;
