const mapsCtrl = {};

// models
const escuelaModel = require("../model/escuela");
const municipioModel = require("../model/municipio");
const zonaModel = require("../model/zona");

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
    const zonas = await zonaModel.find();

    if (municipios === undefined || municipios === null || municipios.length === 0) {
        return new StandarException('No existen municipios', codigos.validacionIncorrecta);
    }

    if (escuelas === undefined || escuelas === null || escuelas.length === 0) {
        return new StandarException('No existen escuelas', codigos.validacionIncorrecta);
    }

    const statesData = {
        "type": "FeatureCollection",
        "features": []
    }
    const zonaData = {
        "type": "FeatureCollection",
        "features": []
    }
    const proni = [];

    for (let esc of escuelas) {
        let mun = municipios.find(data => data.oid == esc.oid);
        if (mun !== undefined) {
            proni.push({
                nombre: esc.nombre,
                clave: esc.clave,
                municipio: mun.nombre,
                coordenadas: esc.coordenadas,
                iconUrl: mun.icon,
                iconSize: mun.iconSize,
                iconAnchor: mun.iconAnchor,
                popupAnchor: mun.popupAnchor,
                oid: esc.oid
            });
            statesData.features.push(mun.feature);
        }
    }
    for(let zo of zonas){
        zonaData.features.push(zo.feature);
    }

    return { karma: proni, statesData: statesData, zonaData: zonaData, municipios:  municipios};
}

mapsCtrl.obtenerInforme = async (clave) => {
    const csvURL = 'https://raw.githubusercontent.com/BelmontIzacc/maps/master/Tula.csv';

    // Realiza una solicitud HTTP para obtener el contenido del archivo .csv
    const response = await axios.get(csvURL);

    if (response.status === 200) {
        // Convierte el contenido del .csv a un array de objetos JSON
        const jsonData = await csv().fromString(response.data);
        console.log(jsonData);
        return jsonData
    }
    return true;
}

module.exports = mapsCtrl;