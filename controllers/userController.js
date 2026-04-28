import User from "../models/User"

const getAllUsers = async (_req, res, next) => {
    try {
        const users = await User.find();  
        res.status(200).json(users)
    } catch (err) {
        next (err)
    }
}


const getUserProfile = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json(user)
    } catch (err ) {
        next(err)
    }
}

const setAsAdmin = async (req, res, next) => {
    try {
        const  userId= req.params.id
        const updatedUser = await User.findByIdAndUpdate(userId, 
            {role: "admin"},
            {new: true}
        )
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            })
        } res.status(200).json({
            message: "Updated user to admin",
            user: updatedUser
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
    } catch (error) {
        next(err)
    }
}

module.exports = {getAllUsers, getUserProfile, setAsAdmin, deleteUser}