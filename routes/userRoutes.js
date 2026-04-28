const express = require("express")
const { verify, verifyAdmin } = require("../middlewares/authMiddleware")
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/allUsers', verify, verifyAdmin,userController.getAllUsers )
router.get('/userProfiles', verify, verifyAdmin,userController.getUserProfile )
router.patch('/setUser/:id', verify, verifyAdmin, userController.setAsAdmin)
router.delete('/:id', verify,verifyAdmin, userController.deleteUser)



module.exports = router