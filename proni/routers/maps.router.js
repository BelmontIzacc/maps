// imports de modulo express y router
const express = require('express');
const router = express.Router();

const mapsCtrl = require('../controller/maps.controllers');

router.get('/', mapsCtrl.home);

// export del modulo router
module.exports = router;