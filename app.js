const express = require('express');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const userRoutes = require('./src/routes/userRoutes');

// === MIDDLEWARES ===

app.use(express.json()); 

app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
    createParentPath: true
}));

app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));


// === RUTAS ===

app.use('/usuarios', userRoutes);

app.get('/', (req, res) => {
    res.send('API de Portafolio funcionando. Usa /usuarios para interactuar.');
});





app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});