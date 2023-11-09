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

// const cargarCtrl = require('../controller/cargardb.controller');

// import de exceptions
const StandarException = require('../exception/StandarException');

// rutas

// mapas
// router.get('/', mapsCtrl.home);

router.get('/vaneSoftecSolutions', async (req, res, next) => {
    const resultado = await mapsCtrl.renderMap();
    if (resultado instanceof StandarException) {
        next(resultado);
        return;
    }
    res.render('maps.ejs', { marks: resultado.karma, statesData: resultado.statesData, zonaData: resultado.zonaData, municipios: resultado.municipios });
});

// router.get('/init', cargarCtrl.iniciar);

router.get('/proni/:id', async (req, res, next) => {
    const id = req.params.id;
    const resultado = await mapsCtrl.obtenerInforme(id);
    if (resultado instanceof StandarException) {
        next(resultado);
        return;
    }
    res.render('informe.ejs', {id: resultado});
}); 

// Esta ruta será una vista por defecto para rutas no definidas
router.get((req, res) => { res.render('error404.ejs') });

// export del modulo router
module.exports = router;