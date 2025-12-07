const userModel = require('../models/userModel');
const path = require('path');
const fs = require('fs');

const getProfile = (req, res) => {
    const { id } = req.params;
    const user = userModel.getById(id);

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
};

const updateProfile = (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;

    if (req.user.id !== id) {
        return res.status(403).json({ message: 'No tienes permiso para modificar este perfil' });
    }

    const updatedUser = userModel.update(id, { nombre, email });

    if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { password, ...userWithoutPassword } = updatedUser;
    res.json({ message: 'Perfil actualizado', user: userWithoutPassword });
};

const deleteProfile = (req, res) => {
    const { id } = req.params;

    if (req.user.id !== id) {
        return res.status(403).json({ message: 'No tienes permiso para eliminar este perfil' });
    }

    const deletedUser = userModel.remove(id);

    if (!deletedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado correctamente' });
};


const uploadImage = (req, res) => {
    const { id } = req.params;

    if (req.user.id !== id) {
        return res.status(403).json({ message: 'No tienes permiso para subir imagen a este perfil' });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
    }

    const file = req.files.imagen;

    // VALIDACIONES (Requisitos de la evaluación)
    if (file.size > 5 * 1024 * 1024) {
        return res.status(400).json({ message: 'El archivo es demasiado grande (Máx 5MB)' });
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return res.status(400).json({ message: 'Solo se permiten imágenes (JPG, PNG, GIF, WEBP)' });
    }

    const extension = path.extname(file.name);
    const fileName = `user_${id}_${Date.now()}${extension}`;
    
    const uploadPath = path.join(__dirname, '../uploads/', fileName);

    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al subir el archivo', error: err });
        }

        const imageUrl = `/uploads/${fileName}`;
        userModel.update(id, { imagen: imageUrl });

        res.json({ 
            message: 'Imagen subida correctamente', 
            imageUrl: imageUrl 
        });
    });
};

module.exports = {
    getProfile,
    updateProfile,
    deleteProfile,
    uploadImage
};