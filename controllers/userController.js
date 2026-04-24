import User from "../models/User"
import Post from "../models/Post"

const getAllUsers = async (_req, res, next) => {
    try {
        const users = User.find();  
        res.status(200).json(users)
    } catch (err) {
        next (err)
    }
}


const getUserProfile = (req, res) => {

}

const setAsAdmin = () => {

}

const deleteUser = () => {

}




module.exports = {getAllUsers, getUserProfile, setAsAdmin, deleteUser}