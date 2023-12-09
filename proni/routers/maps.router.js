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
const cargarCtrl = require('../controller/cargardb.controller');
const reporteCtrl = require('../controller/reporte.controller');

// import de exceptions
const StandarException = require('../exception/StandarException');

// rutas

// reporte

router.get('/reporte/xls', async (req, res, next) => {
    const excelBase64Escuela = await reporteCtrl.crearXls(1);
    const excelBase64Municipio = await reporteCtrl.crearXls(2);
    const excelBase64Zona = await reporteCtrl.crearXls(3);
    res.render('reporte.ejs', { escuela: excelBase64Escuela, municipio: excelBase64Municipio, zona: excelBase64Zona });
});

// mapas

router.get('/cretam/proni', async (req, res, next) => {
    const resultado = await mapsCtrl.renderMap();
    if (resultado instanceof StandarException) {
        next(resultado);
        return;
    }
    res.render('maps.ejs', { marks: resultado.karma, statesData: resultado.statesData, zonaData: resultado.zonaData, municipios: resultado.municipios, buscar: resultado.buscar });
});

router.get('/cargar/:clave', async (req, res, next) => {
    const clave = req.params.clave;
    if (clave == 'belmont') {
        const resultado = await cargarCtrl.iniciar();
        res.json({ status: resultado });
    } else {
        res.json({ status: false });
    }
});

router.get('/init/:clave', async (req, res, next) => {
    const clave = req.params.clave;
    if (clave == 'vsts') {
        const resultado = await cargarCtrl.features();
        res.json({ status: resultado });
    } else {
        res.json({ status: false });
    }
});

router.get('/proni/general/top', async (req, res, next) => {
    const resultado = await mapsCtrl.filtrarRegistros();
    res.render('top.ejs', { escuela: resultado.escuela, municipio: resultado.municipio, zona: resultado.zona });
});

router.get('/proni/general/:tipo', async (req, res, next) => {
    const tipo = req.params.tipo;
    const resultado = await mapsCtrl.obtenerInformeGeneral(tipo);
    if (resultado instanceof StandarException) {
        next(resultado);
        return;
    }
    res.render('informe_general.ejs', {
        imagenes: resultado.imagenes, tablas: resultado.tablas, cabezeras: resultado.cabezeras,
        titulo: resultado.titulo, tipo: resultado.tipo, linkTablas: resultado.linkTablas,
        defGeneral: resultado.defGeneral
    });
});

router.get('/proni/:tipo/:oid/:id', async (req, res, next) => {
    const id = req.params.id;
    const tipo = req.params.tipo;
    const oid = req.params.oid;

    const resultado = await mapsCtrl.obtenerInforme(tipo, id, oid);
    if (resultado instanceof StandarException) {
        next(resultado);
        return;
    }

    res.render('informe.ejs', {
        imagenes: resultado.imagenes, tablas: resultado.tablas, cabezeras: resultado.cabezeras,
        top: resultado.top, titulo: resultado.titulo, detalle: resultado.detalle, tipo: resultado.tipo, topMunicipio: resultado.topMunicipio,
        linkTablas: resultado.linkTablas, topEscuela: resultado.topEscuela,
        defGeneral: resultado.defGeneral
    });
});

router.get('/vsts', async (req, res, next) => {
    res.render('easter.ejs');
});

router.post('/vsts', async (req, res, next) => {
    const userInput = req.body.userInput.toLowerCase();
    const secretWord = 'vanesoftecsolutions';
    const esEasterEgg = userInput === secretWord;

    if (esEasterEgg) {
        // Proporciona la URL de redirección en caso de que sea un Easter egg
        res.json({ esEasterEgg, urlRedireccion: 'https://diagnostico-nacional-vsts.1.us-1.fl0.io/vsts/make' });
    } else {
        res.json({ esEasterEgg: false });
    }
});

router.get('/make', async (req, res, next) => {
    res.render('creditos.ejs');
});

// Esta ruta será una vista por defecto para rutas no definidas
router.get((req, res) => { res.render('error404.ejs') });

// export del modulo router
module.exports = router;