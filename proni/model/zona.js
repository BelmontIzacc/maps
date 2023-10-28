const mongoose = require('mongoose');
const { Schema } = mongoose;

let zonaShema = new Schema({
    'nombre': { type: String, required: true },
    'feature': {type: Object},
    'oid': {type: Array}
});

module.exports = mongoose.model('zn', zonaShema); // coleccion , esquema