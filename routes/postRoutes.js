const express = require ("express");
const router = express.Router()
const postController = require('../controllers/postController')
const { verify } = require('../middlewares/authMiddleware')
const {validateObjectId} = require('../middlewares/validateObjectId')

router.get('/',postController.getAllPosts)
router.get('/:id', verify,validateObjectId, postController.getPostById)
router.post('/', verify, postController.createPost)
router.patch('/:id', verify,validateObjectId, postController.updatePost)
router.delete('/:id', verify,validateObjectId, postController.deletePost)

module.exports = router