import User from "../models/User"
const bcrypt = require("bcrypt");


const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        } if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        } 
            console.log(user)
            res.status(200).json({
            message: "Login successfully",
            user: user
        })
    } catch (err) {
        next(err)
    }
}

const registerUser = async (req, res, next) => {
    try {
        const {firstName, lastName, email, password} = req.body
    // basic validation
        if (!firstName || !lastName || email || password) {
            return res.status(400).json({
                messag: "All fields are required"
            })    
        } 
    // check existing user
        const existingUser = await User.findOne({email})
        if (!existingUser) {
            return res.status(404).json({
                message: "User not exist"
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
        const { password: _, ...safeUser} = newUser.toObject();
        res.status(201).json({
            message: "User registered successfully",
            user: safeUser
        })

    } catch (error) {
        
    }
}

const logoutUser = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {loginUser, registerUser, logoutUser}