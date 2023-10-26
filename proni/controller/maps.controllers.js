const mapsCtrl = {};

// models
const escuelaModel = require("../model/escuela");
const municipioModel = require("../model/municipio");

// import de exceptions
const StandarException = require('../exception/StandarException');
const codigos = require('../exception/codigos');

// import para manejo de archivos
const csv = require('csvtojson');

// import para peticion http
const axios = require('axios');

mapsCtrl.home = async (req, res) => {
    res.render('mapa_tamaulipas.ejs');
}

/**
 * @name crear mapa
 * @author IIB
 * @version 0.0.1
 * @description Carga los datos de ubicaciones (latitud y longitud) para ser mostrados en un mapa. 
 * Ademas, carga informacion adicional relacionada a cada punto.
 * @returns [{'...'}] | StandarException
 */
mapsCtrl.renderMap = async () => {
    const municipios = await municipioModel.find();
    const escuelas = await escuelaModel.find();

    if (municipios === undefined || municipios === null || municipios.length === 0) {
        return new StandarException('No existen municipios', codigos.validacionIncorrecta);
    }

    if (escuelas === undefined || escuelas === null || escuelas.length === 0) {
        return new StandarException('No existen escuelas', codigos.validacionIncorrecta);
    }

    const proni = [];
    for (let esc of escuelas) {
        let mun = municipios.find(data => data._id == esc.MUN);
        if (mun !== undefined) {
            proni.push({
                nombre: esc.nombre,
                clave: esc.clave,
                municipio: mun.nombre,
                coordenadas: esc.coordenadas,
                iconUrl: mun.icon,
                iconSize: mun.iconSize,
                iconAnchor: mun.iconAnchor,
                popupAnchor: mun.popupAnchor
            });
        }
    }
    return proni;
}

mapsCtrl.obtenerInforme = async (clave) => {
    // https://drive.google.com/file/d/1--c_KXOvjKGyasM4Jg9x6gS1Einrvh51/view?usp=sharing
    const csvURL = 'https://drive.google.com/file/d/1--c_KXOvjKGyasM4Jg9x6gS1Einrvh51';

    // Realiza una solicitud HTTP para obtener el contenido del archivo .csv
    const response = await axios.get(csvURL);

    if (response.status === 200) {
        // Convierte el contenido del .csv a un array de objetos JSON
        const jsonData = await csv().fromString(response.data);
        return jsonData
    }
    return true;
}

module.exports = mapsCtrl;