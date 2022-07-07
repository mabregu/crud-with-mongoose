const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

router.get('/', userControllers.getAllUsers);
router.get('/:id', userControllers.getUser);
router.post('/', userControllers.createUser);
router.put('/:id', userControllers.updateUser);
router.delete('/:id', userControllers.deleteUser);

module.exports = router;