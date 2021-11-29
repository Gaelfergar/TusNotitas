//Pone a index.hbs, de la carpeta Vistas, como página principal. (lo primero que sale en localhost:5555)

const express = require('express');
const router = express.Router();

//ruta inicial
router.get('/', async (req, res) => {
    res.render('index');
});

module.exports = router;