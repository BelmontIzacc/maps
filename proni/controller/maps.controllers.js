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
            
            const feature = esc.feature === undefined ? null: esc.feature;
            let students_number = "Sin datos";
            let best_section = "Sin datos";
            let worst_section = "Sin datos";
            let qualification_listening = "Sin datos";
            let qualification_reading = "Sin datos";
            let qualification_speaking = "Sin datos";

            if(feature !== null){
                students_number = esc.feature.students_number;
                best_section = esc.feature.best_section;
                worst_section = esc.feature.worst_section;
                qualification_listening = esc.feature.qualification_listening;
                qualification_reading = esc.feature.qualification_reading;
                qualification_speaking = esc.feature.qualification_speaking;
            }

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

                noEstudiantes: students_number,
                mejorSeccion: best_section,
                peorSeccion: worst_section,
                listen: qualification_listening,
                reading: qualification_reading,
                speaking: qualification_speaking
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

            const feature = esc.feature === undefined ? null: esc.feature;
            let students_number = "Sin datos";
            let best_section = "Sin datos";
            let worst_section = "Sin datos";
            let qualification_listening = "Sin datos";
            let qualification_reading = "Sin datos";
            let qualification_speaking = "Sin datos";

            if(feature !== null){
                students_number = esc.feature.students_number;
                best_section = esc.feature.best_section;
                worst_section = esc.feature.worst_section;
                qualification_listening = esc.feature.qualification_listening;
                qualification_reading = esc.feature.qualification_reading;
                qualification_speaking = esc.feature.qualification_speaking;
            }

            buscar.push({
                nombre: esc.nombre,
                oid: esc.oid,
                clave: esc.clave,
                tipo: 1,

                noEstudiantes: students_number,
                mejorSeccion: best_section,
                peorSeccion: worst_section,
                listen: qualification_listening,
                reading: qualification_reading,
                speaking: qualification_speaking
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
        const buscarImg = ["_6.png", "_1.png", "_2.png", "_3.png", "_4.png", "_5.png", "_11.png", "_7.png", "_8.png"];
        const buscarCsv = ["_6.csv", "_1.csv", "_2.csv", "_3.csv", "_4.csv", "_5.csv", "_11.csv", "_7.csv", "_8.csv"];

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
            return new StandarException('No existe el objeto en municipio', codigos.datoNoEncontrado);
        }
        const mun = municipio.feature.properties; // { name, zona, noEscuelas, noAlumnos, topSeccion['mejor','peor'], generos['girls', 'boys']}
        top = mun;
    } else if (tipo === 'municipio') {
        const buscarImg = ["_6.png", "_1.png", "_2.png", "_3.png", "_4.png", "_5.png", "_11.png", "_7.png", "_8.png"];
        const buscarCsv = ["_6.csv", "_1.csv", "_2.csv", "_3.csv", "_4.csv", "_5.csv", "_11.csv", "_7.csv", "_8.csv"];

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
            return new StandarException('No existe el objeto en zona', codigos.datoNoEncontrado);
        }
        const zona = refZona[0];
        const valores = zona.feature.properties; // { name, mejorEscuela, noEscuelas, noAlumnos, noMunicipios, topSeccion['mejor','peor'], generos['girls', 'boys']}
        top = valores;
    } else if (tipo === 'zona'){
        const buscarImg = ["_0.png", "_6.png", "_1.png", "_2.png", "_3.png", "_4.png", "_5.png", "_11.png", "_7.png", "_8.png"];
        const buscarCsv = ["_0.csv", "_6.csv", "_1.csv", "_2.csv", "_3.csv", "_4.csv", "_5.csv", "_11.csv", "_7.csv", "_8.csv"];
        // oid -> Zona A
        const refZona = await zonaModel.find({ nombre: oid });
        if (!refZona) {
            return new StandarException('No existe el objeto', codigos.datoNoEncontrado);
        }
        const zona = refZona[0];
        const claveName = zona.nombre;
        titulo = claveName;

        const elementos = await recuperarElementos(buscarImg, buscarCsv, "Zona", claveName);
        imagenes = elementos.imagenes;
        tablas = elementos.tablas;
        cabezeras = elementos.cabezeras;
        linkTablas = elementos.linkTablas;

        const buscarImgDetalle = ["Listening.png", "Reading.png", "Speaking parte 1.png", "Speaking parte 2.png", "Speaking.png"];
        const buscarCsvDetalle = ["Listening.csv", "Reading.csv", "Speaking parte 1.csv", "Speaking parte 2.csv", "Speaking.csv"];
        const dElementos = await recuperarElementos(buscarImgDetalle, buscarCsvDetalle, "Zona", "Calificación promedio por municipio de la zona " + claveName + " para sección ");
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
        return new StandarException('No existe el objeto para tablas', codigos.datoNoEncontrado);
    }
    
    const defGeneral = await definicionGraficas(imagenes, tipo, 0);

    return { titulo, detalle, imagenes, tablas, cabezeras, top, tipo, topMunicipio, linkTablas, topEscuela, defGeneral };
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
        const buscarImg = ["_1.png", "_2.png", "_3.png", "_4.png", "_11.png", "_7.png", "_8.png"];
        const buscarCsv = ["_1.csv", "_2.csv", "_3.csv", "_4.csv", "_11.csv", "_7.csv", "_8.csv"];

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

        titulo = "Detalles generales";
    } else if (tipo === 'general'){
        let buscarImg = ["_6.png", "_1.png", "_2.png", "_3.png", "_4.png", "_5.png", "_11.png"];
        let buscarCsv = ["_6.csv", "_1.csv", "_2.csv", "_3.csv", "_4.csv", "_5.csv", "_11.csv"];

        const elementos = await recuperarElementos(buscarImg, buscarCsv, "General", "Promedio de todos los registros");
        imagenes = elementos.imagenes;
        tablas = elementos.tablas;
        cabezeras = elementos.cabezeras;
        linkTablas = elementos.linkTablas;

        buscarImg = ["mayor índice de aciertos en todos los registros_7.png", "menor índice de aciertos en todos los registros_8.png"];
        buscarCsv = ["mayor índice de aciertos en todos los registros_7.csv", "menor índice de aciertos en todos los registros_8.csv"];

        let preguntas = await recuperarElementos(buscarImg, buscarCsv, "General", "Preguntas con ");
        imagenes = imagenes.concat(preguntas.imagenes);
        tablas = tablas.concat(preguntas.tablas);
        cabezeras = cabezeras.concat(preguntas.cabezeras);
        linkTablas = linkTablas.concat(preguntas.linkTablas);

        /*
        buscarImg = ["_12.png", "_9.png", "_10.png"];
        buscarCsv = ["_12.csv", "_9.csv", "_10.csv"];

        preguntas = await recuperarElementos(buscarImg, buscarCsv, "General", "Promedio de todos los registros");
        imagenes = imagenes.concat(preguntas.imagenes);
        tablas = tablas.concat(preguntas.tablas);
        cabezeras = cabezeras.concat(preguntas.cabezeras);
        linkTablas = linkTablas.concat(preguntas.linkTablas);
        */
        titulo = "Detalles generales de los registros";
    }

    if (tablas.length === 0) {
        return new StandarException('No existe el objeto', codigos.datoNoEncontrado);
    }

    const defGeneral = await definicionGraficas(imagenes, tipo, 1);

    return { titulo, imagenes, tablas, cabezeras, tipo, linkTablas, defGeneral };
}

mapsCtrl.filtrarRegistros = async () => {
    const csvEscuela = csvURL + 'Informacion_general/escuelas.csv';
    const csvMun = csvURL + 'Informacion_general/municipios.csv';
    const csvZona = csvURL + 'Informacion_general/zonas.csv';

    const munData = await municipioModel.find();
    const escData = await escuelaModel.find();

    let escuela = await recuperarDatosGenerales(csvEscuela, escData, 1);
    let municipio = await recuperarDatosGenerales(csvMun, munData, 2);
    let zona = await recuperarDatosGenerales(csvZona, [], 3);

    escuela = escuela.map(convertirAEntero);
    municipio = municipio.map(convertirAEntero);
    zona = zona.map(convertirAEntero);

    return { escuela, municipio, zona};
}

// Función para convertir ciertos valores a números
convertirAEntero = (objeto) => {
    return {
        ...objeto,
        correct_answers_reading_writing: parseFloat(objeto.correct_answers_reading_writing),
        correct_answers_listening: parseFloat(objeto.correct_answers_listening),
        correct_answers_speaking: parseFloat(objeto.correct_answers_speaking),
        correct_answers_speaking_part_1: parseFloat(objeto.correct_answers_speaking_part_1),
        correct_answers_speaking_part_2: parseFloat(objeto.correct_answers_speaking_part_2),

        students_number: parseInt(objeto.students_number, 10),
        girl: parseInt(objeto.girl, 10),
        boy: parseInt(objeto.boy, 10),
        percentage_correct: parseFloat(objeto.percentage_correct)
    };
}

recuperarDatosGenerales = async (csvUrl, dataBase = [], tipo) => {
    let response = await axios.get(csvUrl);
    const datosGenerales = [];
    if (response.status === 200) {
        const jsonData = await csv().fromString(response.data);
        for (let data of jsonData) {
            let titulo = "";
            let oid = "";
            let clave = ""
            if (data.municipality !== undefined && data.municipality !== null && data.municipality !== ''){
                titulo = data.municipality;
                const dtable = dataBase.find(db => db.nombre === data.municipality);
                if (dtable !== undefined){
                    oid = dtable.oid;
                }
            } else if (data.school_name !== undefined && data.school_name !== null && data.school_name !== ''){
                titulo = data.school_name;
                const dtable = dataBase.find(db => db.clave == data.CCT);
                if(dtable !== undefined){
                    oid = dtable.oid;
                    clave = data.CCT;
                }
            } else if (data.zone !== undefined && data.zone !== null && data.zone !== ''){
                titulo = data.zone;
                oid = "";
            }
            datosGenerales.push(
                {
                    reviewer_answers_speaking_part_1: data.reviewer_answers_speaking_part_1,
                    reviewer_answers_speaking_part_2: data.reviewer_answers_speaking_part_2,
                    reviewer_answers_listening: data.reviewer_answers_listening,
                    reviewer_answers_reading_writing: data.reviewer_answers_reading_writing,
                    correct_answers_listening: data.correct_answers_listening,
                    correct_answers_reading_writing: data.correct_answers_reading_writing,
                    correct_answers_speaking_part_1: data.correct_answers_speaking_part_1,
                    correct_answers_speaking_part_2: data.correct_answers_speaking_part_2,
                    qualification_speaking_part_1: data.qualification_speaking_part_1,
                    qualification_speaking_part_2: data.qualification_speaking_part_2,
                    qualification_listening: data.qualification_listening,
                    qualification_reading: data.qualification_reading,
                    correct_answers_speaking: data.correct_answers_speaking,
                    qualification_speaking: data.qualification_speaking,
                    best_section: data.best_section,
                    worst_section: data.worst_section,
                    students_number: data.students_number,
                    girl: data.girl,
                    boy: data.boy,
                    titulo: titulo,
                    oid: oid,
                    tipo: "" + tipo,
                    clave: clave,
                    percentage_correct: data.percentage_correct
                }
            );
        }
        return datosGenerales;
    }
    return datosGenerales;
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

definicionGraficas = async (imagenes = [], tipo = "", busqueda = 0) => {
    const definiciones = await explicacionGraficas();
    const explicacion = [];
    for(let img of imagenes){
        // img = https://raw.githubusercontent.com/BelmontIzacc/maps_datos/master/Escuelas/28DPR0513B_10.png
        if( ( tipo == 'zona' || tipo == 'municipio' || tipo == 'escuela' ) && busqueda === 0){
            let detalle = definiciones.find( dato => ( dato.Carpeta == 'area' || dato.Carpeta == 'Zona' || dato.Carpeta == 'Municipios' || dato.Carpeta == 'Escuela')  && img.includes(dato.Archivo));
            if(detalle !== undefined){
                explicacion.push({
                    archivo: detalle.Archivo,
                    definicion: detalle.Descripcion
                });
            } else {
                explicacion.push({
                    archivo: "",
                    definicion: ""
                });
            }
        }else if( ( tipo == 'zona' || tipo == 'municipio' || tipo == 'general' ) && busqueda === 1){
            let detalle = definiciones.find( dato => ( dato.Carpeta == 'General' || dato.Carpeta == 'Zona' || dato.Carpeta == 'Municipios')  && img.includes(dato.Archivo));
            if(detalle !== undefined){
                explicacion.push({
                    archivo: detalle.Archivo,
                    definicion: detalle.Descripcion
                });
            } else {
                explicacion.push({
                    archivo: "",
                    definicion: ""
                });
            }
        } else {
            explicacion.push({
                archivo: "",
                definicion: ""
            });
        }
    }
    return explicacion;
}

explicacionGraficas = async () => {
    const urlDef = csvURL + "explicacion_graficas.csv";
    const response = await axios.get(urlDef);
    let data = []
    if (response.status === 200) {
        const jsonData = await csv().fromString(response.data);
        data = jsonData;
    }
    return data;
}

module.exports = mapsCtrl;