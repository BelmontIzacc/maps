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

// path de recursos (claves, mapas)
const csvURL = 'https://raw.githubusercontent.com/BelmontIzacc/maps_datos/master/';

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
                oid: esc.oid,

                noEstudiantes: esc.feature.students_number,
                mejorSeccion: esc.feature.best_section,
                peorSeccion: esc.feature.worst_section,
                listen: esc.feature.qualification_listening,
                reading: esc.feature.qualification_reading,
                speaking: esc.feature.qualification_speaking
            });
            statesData.features.push(mun.feature);
        }
    }
    for (let zo of zonas) {
        zonaData.features.push(zo.feature);
    }

    let buscar = [];
    for(let mun of municipios){
        buscar.push({
            nombre: mun.nombre,
            oid: mun.oid,
            clave: "",
            tipo: 0,
            zona: mun.feature.properties.zona,
            noEscuelas: mun.feature.properties.noEscuelas,
            noAlumnos: mun.feature.properties.noAlumnos,
            topSeccionM: mun.feature.properties.topSeccion.mejor,
            topSeccionP: mun.feature.properties.topSeccion.peor,
            generoM: mun.feature.properties.generos.girls,
            generoH: mun.feature.properties.generos.boys,
        });
    }

    for(let esc of escuelas){
        if(esc.nombre != undefined){
            buscar.push({
                nombre: esc.nombre,
                oid: esc.oid,
                clave: esc.clave,
                tipo: 1,

                noEstudiantes: esc.feature.students_number,
                mejorSeccion: esc.feature.best_section,
                peorSeccion: esc.feature.worst_section,
                listen: esc.feature.qualification_listening,
                reading: esc.feature.qualification_reading,
                speaking: esc.feature.qualification_speaking
            });
        }
    }

    for(let zon of zonas){
        buscar.push({
            nombre: zon.nombre,
            name: zon.feature.properties.name,
            oid: zon.oid,
            clave: "",
            tipo: 2,
            noEscuelas: zon.feature.properties.noEscuelas,
            noAlumnos: zon.feature.properties.noAlumnos,
            topSeccionM: zon.feature.properties.topSeccion.mejor,
            topSeccionP: zon.feature.properties.topSeccion.peor,
            generoM: zon.feature.properties.generos.girls,
            generoH: zon.feature.properties.generos.boys,
            mejorEscuela: zon.feature.properties.mejorEscuela,
            noMunicipios: zon.feature.properties.noMunicipios
        });
    }

    buscar = buscar.sort(compararPorNombre);

    return { karma: proni, statesData: statesData, zonaData: zonaData, municipios: municipios, buscar: buscar };
}

mapsCtrl.obtenerInforme = async (tipo, clave, oid) => {
    // const csvURL = 'https://raw.githubusercontent.com/BelmontIzacc/maps_datos/master/Zona/A_2.csv';
    // const imgURL = 'https://raw.githubusercontent.com/BelmontIzacc/maps_datos/master/Zona/A_1.png';

    let imagenes = [];
    let tablas = [];
    let cabezeras = [];
    let top;
    let titulo = "";
    let detalle = "";
    let topMunicipio = 0;
    let topEscuela = 0;
    let linkTablas = [];

    if (tipo === 'escuela') {
        const buscarImg = ["_1.png", "_2.png", "_3.png", "_4.png"];
        const buscarCsv = ["_1.csv", "_2.csv", "_3.csv", "_4.csv"];

        const elementos = await recuperarElementos(buscarImg, buscarCsv, "Escuelas", clave)
        imagenes = elementos.imagenes;
        tablas = elementos.tablas;
        cabezeras = elementos.cabezeras;
        linkTablas = elementos.linkTablas;

        const escuela = await escuelaModel.findOne({ 'clave': clave });
        if (!escuela) {
            return new StandarException('No existe la clave de escuela', codigos.datoNoEncontrado);
        }
        titulo = escuela.nombre;
        detalle = "Detalles del municipio";
        topEscuela = escuela.feature;

        const municipio = await municipioModel.findOne({ 'oid': oid });
        if (!municipio) {
            return new StandarException('No existe el objeto', codigos.datoNoEncontrado);
        }
        const mun = municipio.feature.properties; // { name, zona, noEscuelas, noAlumnos, topSeccion['mejor','peor'], generos['girls', 'boys']}
        top = mun;
    } else if (tipo === 'municipio') {
        const buscarImg = ["_1.png", "_2.png", "_3.png", "_4.png"];
        const buscarCsv = ["_1.csv", "_2.csv", "_3.csv", "_4.csv"];

        const municipio = await municipioModel.findOne({ 'oid': oid });
        if (!municipio) {
            return new StandarException('No existe el objeto', codigos.datoNoEncontrado);
        }
        const claveName = municipio.nombre;
        titulo = claveName;
        topMunicipio = municipio.feature.properties;

        const elementos = await recuperarElementos(buscarImg, buscarCsv, "Municipios", claveName)
        imagenes = elementos.imagenes;
        tablas = elementos.tablas;
        cabezeras = elementos.cabezeras;
        linkTablas = elementos.linkTablas;

        detalle = "Detalles de la zona";

        const refZona = await zonaModel.find({ oid: { $in: [Number(oid)] } });
        if (!refZona) {
            return new StandarException('No existe el objeto', codigos.datoNoEncontrado);
        }
        const zona = refZona[0];
        const valores = zona.feature.properties; // { name, mejorEscuela, noEscuelas, noAlumnos, noMunicipios, topSeccion['mejor','peor'], generos['girls', 'boys']}
        top = valores;
    } else if (tipo === 'zona'){
        const buscarImg = ["_1.png", "_2.png", "_3.png", "_4.png"];
        const buscarCsv = ["_1.csv", "_2.csv", "_3.csv", "_4.csv"];
        // oid -> Zona A
        const refZona = await zonaModel.find({ nombre: oid });
        if (!refZona) {
            return new StandarException('No existe el objeto', codigos.datoNoEncontrado);
        }
        const zona = refZona[0];
        const claveName = zona.nombre;
        titulo = claveName;

        let file = "A";
        if(claveName == 'Zona B'){
            file = "B";
        } else if (claveName == 'Zona C'){
            file = "C";
        }

        const elementos = await recuperarElementos(buscarImg, buscarCsv, "Zona", file);
        imagenes = elementos.imagenes;
        tablas = elementos.tablas;
        cabezeras = elementos.cabezeras;
        linkTablas = elementos.linkTablas;

        const buscarImgDetalle = ["Listening.png", "Reading.png", "Speaking parte 1.png", "Speaking parte 2.png", "Speaking.png"];
        const buscarCsvDetalle = ["Listening.csv", "Reading.csv", "Speaking parte 1.csv", "Speaking parte 2.csv", "Speaking.csv"];
        const dElementos = await recuperarElementos(buscarImgDetalle, buscarCsvDetalle, "Zona", "Calificación promedio por municipio de la zona A para sección ");
        const imgElm = dElementos.imagenes;
        const tblElm = dElementos.tablas;
        const cbzElm = dElementos.cabezeras;
        const ltblElm = dElementos.linkTablas;

        imagenes = imagenes.concat(imgElm);
        tablas = tablas.concat(tblElm);
        cabezeras = cabezeras.concat(cbzElm);
        linkTablas = linkTablas.concat(ltblElm);

        detalle = "Datos";

        const valores = zona.feature.properties; // { name, mejorEscuela, noEscuelas, noAlumnos, noMunicipios, topSeccion['mejor','peor'], generos['girls', 'boys']}
        top = valores;
    }
    if (tablas.length === 0) {
        return new StandarException('No existe el objeto', codigos.datoNoEncontrado);
    }
    return { titulo, detalle, imagenes, tablas, cabezeras, top, tipo, topMunicipio, linkTablas, topEscuela };
}

mapsCtrl.obtenerInformeGeneral = async (tipo) => {
    let imagenes = [];
    let tablas = [];
    let cabezeras = [];
    let titulo = "";
    let linkTablas = [];

    if(tipo == 'municipio'){
        const buscarImg = ["Listening.png", "Reading.png", "Speaking parte 1.png", "Speaking parte 2.png", "Speaking.png"];
        const buscarCsv = ["Listening.csv", "Reading.csv", "Speaking parte 1.csv", "Speaking parte 2.csv", "Speaking.csv"];

        const elementos = await recuperarElementos(buscarImg, buscarCsv, "Municipios", "Calificación promedio por municipio para sección ")
        imagenes = elementos.imagenes;
        tablas = elementos.tablas;
        cabezeras = elementos.cabezeras;
        linkTablas = elementos.linkTablas;
        titulo = "Detalles generales de municipios";
    } else if(tipo === 'zona'){
        const buscarImg = ["Listening.png", "Reading.png", "Speaking parte 1.png", "Speaking parte 2.png", "Speaking.png"];
        const buscarCsv = ["Listening.csv", "Reading.csv", "Speaking parte 1.csv", "Speaking parte 2.csv", "Speaking.csv"];

        const elementos = await recuperarElementos(buscarImg, buscarCsv, "Zona", "Calificación promedio por zona para sección ")
        imagenes = elementos.imagenes;
        tablas = elementos.tablas;
        cabezeras = elementos.cabezeras;
        linkTablas = elementos.linkTablas;
        titulo = "Detalles generales de zonas";
    } else if(tipo == 'detalles'){
        const buscarImg = ["_1.png", "_2.png", "_3.png", "_4.png"];
        const buscarCsv = ["_1.csv", "_2.csv", "_3.csv", "_4.csv"];

        let elementos = await recuperarElementos(buscarImg, buscarCsv, "Edades", "10");
        imagenes = elementos.imagenes;
        tablas = elementos.tablas;
        cabezeras = elementos.cabezeras;
        linkTablas = elementos.linkTablas;

        elementos = await recuperarElementos(buscarImg, buscarCsv, "Edades", "11");
        imagenes = imagenes.concat(elementos.imagenes);
        tablas = tablas.concat(elementos.tablas);
        cabezeras = cabezeras.concat(elementos.cabezeras);
        linkTablas = linkTablas.concat(elementos.linkTablas);

        elementos = await recuperarElementos(buscarImg, buscarCsv, "Edades", "12");
        imagenes = imagenes.concat(elementos.imagenes);
        tablas = tablas.concat(elementos.tablas);
        cabezeras = cabezeras.concat(elementos.cabezeras);
        linkTablas = linkTablas.concat(elementos.linkTablas);

        elementos = await recuperarElementos(buscarImg, buscarCsv, "Edades", "13");
        imagenes = imagenes.concat(elementos.imagenes);
        tablas = tablas.concat(elementos.tablas);
        cabezeras = cabezeras.concat(elementos.cabezeras);
        linkTablas = linkTablas.concat(elementos.linkTablas);

        elementos = await recuperarElementos(buscarImg, buscarCsv, "Edades", "14");
        imagenes = imagenes.concat(elementos.imagenes);
        tablas = tablas.concat(elementos.tablas);
        cabezeras = cabezeras.concat(elementos.cabezeras);
        linkTablas = linkTablas.concat(elementos.linkTablas);

        titulo = "Detalles generales";
    }

    if (tablas.length === 0) {
        return new StandarException('No existe el objeto', codigos.datoNoEncontrado);
    }
    return { titulo, imagenes, tablas, cabezeras, tipo, linkTablas };
}

recuperarElementos = async (buscarImg, buscarCsv, tipo, nombre) => {
    let imagenes = [];
    let tablas = [];
    let cabezeras = [];
    let linkTablas = [];

    for (let index in buscarImg) {
        const imgFile = buscarImg[index];
        const csvFile = buscarCsv[index];

        const urlImg = csvURL + tipo + "/" + nombre + "" + imgFile;
        const urlCsv = csvURL + tipo + "/" + nombre + "" + csvFile;

        try {
            linkTablas.push(urlCsv);
            const response = await axios.get(urlCsv);
            if (response.status === 200) {
                const jsonData = await csv().fromString(response.data);
                tablas.push(jsonData);

                const cbras = Object.keys(jsonData[0]);
                cabezeras.push(cbras);
            }
            imagenes.push(urlImg);
        } catch (err) {

        }
    }

    return { imagenes, tablas, cabezeras, linkTablas }
}

// Función de comparación para ordenar por el campo "nombre"
compararPorNombre = (a, b) => {
    const nombreA = a.nombre.toUpperCase(); // Convierte a mayúsculas para ordenar sin distinguir mayúsculas de minúsculas
    const nombreB = b.nombre.toUpperCase();

    if (nombreA < nombreB) {
        return -1;
    }
    if (nombreA > nombreB) {
        return 1;
    }
    return 0; // Nombres son iguales
}

module.exports = mapsCtrl;