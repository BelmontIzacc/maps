const mongoose = require('mongoose');
const { Schema } = mongoose;

let municipioShema = new Schema({
    'nombre': { type: String, required: true },
    'icon': { type: String, required: true },
    'iconSize': { type: Array },
    'iconAnchor': { type: Array },
    'popupAnchor': { type: Array }
});

module.exports = mongoose.model('mun', municipioShema); // coleccion , esquema