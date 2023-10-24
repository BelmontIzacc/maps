/**
 * @name Rutas de mapas
 * @description Rutas para mostrar mapas
 * @author IIB
 */

// imports de modulo express y router
const express = require('express');
const router = express.Router();

// import de controlador
const mapsCtrl = require('../controller/maps.controllers');

// import de exceptions
const StandarException = require('../exception/StandarException');

// rutas

// mapas
router.get('/', mapsCtrl.home);

router.get('/proni', async (req, res, next) => {
    const resultado = await mapsCtrl.renderMap();
    if (resultado instanceof StandarException) {
        next(resultado);
        return;
    }
    res.render('maps.ejs', { marks: resultado });
});

// Esta ruta será una vista por defecto para rutas no definidas
router.get((req, res) => { res.render('error404.ejs') });

// export del modulo router
module.exports = router;