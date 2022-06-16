const Controller = require('../controllers/controller')
const router = require('express').Router()

router.get('/', Controller.getAllUsers)
router.get('/:id', Controller.getOneUser)
router.post('/', Controller.postUser)
router.patch('/:id', Controller.patchUser)
router.delete('/:id', Controller.deleteUser)

module.exports = router