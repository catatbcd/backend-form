require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const contactRoutes = require('./routes/contactRoutes');

app.use(helmet()); // Protege contra vulnerabilidades comunes
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Registra solicitudes en consola

app.use('/api', contactRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ mensaje: "Error interno del servidor." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
