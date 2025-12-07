const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

// === RUTAS PÚBLICAS ===

router.post('/', authController.register);

router.post('/login', authController.login);


// === RUTAS PROTEGIDAS ===

router.get('/:id', verifyToken, userController.getProfile);

router.put('/:id', verifyToken, userController.updateProfile);

router.delete('/:id', verifyToken, userController.deleteProfile);

router.post('/:id/imagen', verifyToken, userController.uploadImage);

module.exports = router;