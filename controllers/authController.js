const User = require('../models/User')
const Blacklist = require('../models/Blacklist')
const bcrypt = require("bcrypt");
const {createAccessToken} = require('../middlewares/authMiddleware')

const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        } 
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }
        console.log(user)
        const accessToken = createAccessToken(user);
        const {password: _password, ...safeUser} = user.toObject()
            res.status(200).json({
            message: "Login successfully",  
            user: safeUser,
            token: accessToken
        })
    } catch (err) {
        next(err)
    }
}

const registerUser = async (req, res, next) => {
    try {
        const {firstName, lastName, email, password} = req.body
    // basic validation
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                messag: "All fields are required"
            })    
        } 
    // check existing user
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(404).json({
                message: "User already exist"
            })
        }
    // hash password
        const hashedPassword =  await bcrypt.hash(password, 10)
    //create user
        const newUser = await User.create({
            firstName, lastName, email, 
            password: hashedPassword
        })
    // remove password from response
        const { password: _password, ...safeUser} = newUser.toObject();
        res.status(201).json({
            message: "User registered successfully",
            user: safeUser
        })

    } catch (err) {
        next(err)
    }
}

const logoutUser = async (req, res, next) => {
    try {
        // Get the authHeader
        const authHeader = req.headers.authorization;
        // Check if may token
        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided"
            })
        } 
        // Extract the token by separating it with " " and 
        // making it array and then get index 1
        const token = authHeader.split(" ")[1]
        // Validate natin ang format
        if (!token) {
            return res.status(401).json({
                message: "Invalid token format"
            })
        }
        await Blacklist.create({token});
        console.log("Logout successfully: ", req.user?.id)
        
        // Return success message
        return res.status(200).json({
            message: "Logged out successfully"
        })
        
    } catch (err) {
        next(err)
    }
}

module.exports = {loginUser, registerUser, logoutUser}