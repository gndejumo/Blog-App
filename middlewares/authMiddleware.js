const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


// Token Creation
// jwt.sign(payload, secret, options)
const createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    return jwt.sign(data, JWT_SECRET_KEY,{expiresIn: "24h"});
};

const verify = async (req, res, next) => {
    console.log(req.headers.authorization);
    try {
        // get the authorization header
        const authHeader = req.headers.authorization;
        // check token format and existence
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Invalid or missing token"
        })
    }
    const token = authHeader.split(" ")[1];
    // check blacklist
    const blacklisted = await Blacklist.findOne({token})
    if (blacklisted) {
        return res.status(401).json({
            message: "User has been logout"
        }) 
    }
    // verify token
    // syntax = jwt.verify(token, secretOrPublicKey, callback)
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;

    console.log("Decoded: ", decoded)
    next();
    } catch(err) {
        next(err)
    }
} 


module.exports = {createAccessToken, verify}
