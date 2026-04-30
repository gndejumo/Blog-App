const User = require('../models/User')

const getAllUsers = async (_req, res, next) => {
    try {
        const users = await User.find();
        const safeUser = users.map(user => {
            const {password: _password, ...safeUser} = user.toObject();
            return safeUser;
        })
        res.status(200).json(safeUser)
    } catch (err) {
        next (err)
    }
}


const getUserProfile = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await User.findById(id).populate({
            path: "posts",
            select: ["title", "content"]
        })
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const {password: _password, ...safeUser} = user.toObject();
        res.status(200).json(safeUser)
    } catch (err ) {
        next(err)
    }
}

const setAsAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "admin"){
            return res.status(403).json({
                message: "Unathorized"
            })
        }
        const userId= req.params.id
        const updatedUser = await User.findByIdAndUpdate(userId, 
            {role: "admin"},
            {new: true}
        )
        
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            })
        } 
        const {password: _password, ...safeUser} = updatedUser.toObject()
        res.status(200).json({
            message: "Updated user to admin",
            user: safeUser
        })

    } catch (err) {
        next(err)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Unauthorized user"
        })
    }
    const userId = req.params.id
    const user = await User.findByIdAndDelete(userId)
        if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
        } res.status(200).json({
        message: "Deleted the user successfully",
        user: user
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {getAllUsers, getUserProfile, setAsAdmin, deleteUser}