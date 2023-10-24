const mongoose = require('mongoose');
const { Schema } = mongoose;

let escuelaShema = new Schema({
    'nombre': { type: String, required: true },
    'clave': { type: String, required: true },
    'MUN': { type: String, required: true },
    'coordenadas': { type: Array },
});

module.exports = mongoose.model('es', escuelaShema); // coleccion , esquema