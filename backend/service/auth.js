const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    console.log('request URL:', req.url);
    console.log('request method:', req.method);
    console.log('request headers cookie:', req.headers.cookie);
    console.log('parsed cookies:', req.cookies);
    console.log('headers:', req.headers);
    console.log('token',  req.cookies.token)
    
    const token = req.cookies.token;
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }

}

module.exports = authenticateToken;
