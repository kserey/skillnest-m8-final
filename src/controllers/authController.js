const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = async (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Faltan datos obligatorios (nombre, email, password)' });
    }

    const existingUser = userModel.findByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
        id: Date.now().toString(),
        nombre,
        email,
        password: hashedPassword,
        imagen: null
    };

    userModel.create(newUser);

    const token = jwt.sign(
        { id: newUser.id, email: newUser.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } 
    );

    res.status(201).json({
        message: 'Usuario registrado con éxito',
        token,
        user: { id: newUser.id, nombre: newUser.nombre, email: newUser.email }
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;


    const user = userModel.findByEmail(email);
    if (!user) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );

    res.json({
        message: 'Login exitoso',
        token,
        user: { id: user.id, nombre: user.nombre, email: user.email, imagen: user.imagen }
    });
};

module.exports = { register, login };