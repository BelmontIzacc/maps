const estanciarCtrl = {};

// models
const escuelaModel = require("../model/escuela");
const municipioModel = require("../model/municipio");
const zonaModel = require("../model/zona");

// import para manejo de archivos
const csv = require('csvtojson');

// import para peticion http
const axios = require('axios');

estanciarCtrl.iniciar = async (req, res) => {
    await iniciarMunicipio();
    await iniciarEscuelas();
    await iniciarZona();
    res.json({ status: true });
}

estanciarCtrl.features = async (req, res) => {
    const escuelas = await escuelaModel.find();
    const csvEscuela = 'https://raw.githubusercontent.com/BelmontIzacc/maps_datos/master/Informacion_general/escuelas.csv';
    const csvMun = 'https://raw.githubusercontent.com/BelmontIzacc/maps_datos/master/Informacion_general/municipios.csv';

    const response = await axios.get(csvEscuela);
    if (response.status === 200) {
        const jsonData = await csv().fromString(response.data);
        // console.log(jsonData);
        /*for (let esc of escuelas) {
            
        }*/
    }
}

iniciarMunicipio = async () => {
    let mun = new municipioModel();
    mun.nombre = "Cd. Victoria";
    mun.icon = "/img/verde.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -36];
    mun.oid = "1";
    mun.feature = {
        "type": "Feature",
        "properties": {
            "oid": "1",
            "name": "CD. VICTORIA",
            "zona": "Zona B",
            "noEscuelas": 100,
            "noAlumnos": 500,
            "topSeccion": {
                "mejor": "Reading",
                "peor": "Listening"
            },
            "generos": {
                "girls": 500,
                "boys": 350
            }
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-99.17827108937628, 23.787343172616374],
                    [-99.16282156627045, 23.788285640392886],
                    [-99.16196325943125, 23.774147906319637],
                    [-99.10668829752821, 23.772576952126144],
                    [-99.09484366314706, 23.75026735502625],
                    [-99.09965018180199, 23.71836741901507],
                    [-99.13741568272737, 23.696834479310112],
                    [-99.17809942690609, 23.69809197493662],
                    [-99.19457891873827, 23.706736929237938],
                    [-99.17827108937628, 23.787343172616374]

                ]
            ]
        }
    };

    await mun.save();

    mun = new municipioModel();
    mun.nombre = "Tula";
    mun.icon = "/img/rojo.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -36];
    mun.oid = "2";
    mun.feature = {
        "type": "Feature",
        "properties": {
            "oid": "2",
            "name": "TULA",
            "zona": "Zona C",
            "noEscuelas": 50,
            "noAlumnos": 100,
            "topSeccion": {
                "mejor": "Reading",
                "peor": "Listening"
            },
            "generos": {
                "girls": 50,
                "boys": 30
            }
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-99.73321438395995, 23.000249247342527],
                    [-99.71827984495762, 22.996772876191383],
                    [-99.7174215381184, 23.019051702756236],
                    [-99.7081518242549, 23.007675740294165],
                    [-99.70619917619568, 23.016286800135372],
                    [-99.70602751482784, 23.00807075506725],
                    [-99.69607115549296, 23.011388833503272],
                    [-99.6917796212969, 23.005226622890117],
                    [-99.73520994736108, 22.971092362750124],
                    [-99.73950148155716, 22.97362112226692],
                    [-99.73321438395995, 23.000249247342527]
                ]
            ]
        }
    };
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "Soto La Marina";
    mun.icon = "/img/azul.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -36];
    mun.oid = "3";
    mun.feature = {
        "type": "Feature",
        "properties": {
            "oid": "3",
            "name": "SOTO LA MARINA",
            "zona": "Zona B",
            "noEscuelas": 10,
            "noAlumnos": 10,
            "topSeccion": {
                "mejor": "Reading",
                "peor": "Listening"
            },
            "generos": {
                "girls": 90,
                "boys": 30
            }
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-98.20962038585958, 23.75449009459138],
                    [-98.21605768715368, 23.762031550082572],
                    [-98.21631517920544, 23.77766296694521],
                    [-98.20704546534193, 23.78049056030543],
                    [-98.20077982541568, 23.780333473398482],
                    [-98.19743242874274, 23.779233859736134],
                    [-98.1972607673749, 23.763916845679564],
                    [-98.20292559251371, 23.757632420812563],
                    [-98.20962038585958, 23.75449009459138]

                ]
            ]
        }
    };
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "Padilla";
    mun.icon = "/img/beige.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -36];
    mun.oid = "4";
    mun.feature = {
        "type": "Feature",
        "properties": {
            "oid": "4",
            "name": "PADILLA",
            "zona": "Zona B",
            "noEscuelas": 600,
            "noAlumnos": 100,
            "topSeccion": {
                "mejor": "Reading",
                "peor": "Listening"
            },
            "generos": {
                "girls": 200,
                "boys": 150
            }
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-99.11919993327932, 24.17827816960199],
                    [-98.95303172920762, 24.11938206941058],
                    [-98.91732616469635, 24.198321709713003],
                    [-98.69073315914405, 24.160737489180875],
                    [-98.65640088557551, 24.101833305958966],
                    [-98.60421582975135, 24.11311493004131],
                    [-98.66189404934649, 24.067982472078068],
                    [-98.61932203012151, 23.97390552574581],
                    [-98.69073315914405, 23.96512150032978],
                    [-98.70858594139968, 23.766694565408354],
                    [-98.7964765617351, 23.780518936566867],
                    [-98.92144603752459, 23.94755165374492],
                    [-99.08761424159626, 24.027851395738868],
                    [-99.14117258836318, 24.089297002491247],
                    [-99.11919993327932, 24.17827816960199]

                ]
            ]
        }
    };
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "Tampico";
    mun.icon = "/img/nazul.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -36];
    mun.oid = "5";
    mun.feature = {
        "type": "Feature",
        "properties": {
            "oid": "5",
            "name": "TAMPICO",
            "zona": "Zona C",
            "noEscuelas": 120,
            "noAlumnos": 501,
            "topSeccion": {
                "mejor": "Reading",
                "peor": "Listening"
            },
            "generos": {
                "girls": 501,
                "boys": 352
            }
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-97.90055630757954, 22.325641588604988],
                    [-97.85523770646907, 22.32183049006172],
                    [-97.85765246780326, 22.246735301395717],
                    [-97.84150479704164, 22.208084907690996],
                    [-97.89609311201562, 22.222705435656756],
                    [-97.90055630757954, 22.325641588604988]
                ]
            ]
        }
    };
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "Rio Bravo";
    mun.icon = "/img/cverde.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -36];
    mun.oid = "6";
    mun.feature = {
        "type": "Feature",
        "properties": {
            "oid": "6",
            "name": "RIO BRAVO",
            "zona": "Zona A",
            "noEscuelas": 999,
            "noAlumnos": 999,
            "topSeccion": {
                "mejor": "Reading",
                "peor": "Listening"
            },
            "generos": {
                "girls": 253,
                "boys": 254
            }
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-98.14582347014412, 26.009511613859633],
                    [-98.134665481234353, 26.01367698457891],
                    [-98.12608241284221, 26.009974440125674],
                    [-98.10136317587289, 26.006426058801257],
                    [-98.09775828714818, 25.998866106299587],
                    [-98.07956218215685, 26.003803273259987],
                    [-98.07389735701804, 26.002260430876223],
                    [-98.06651591820082, 26.011362907978164],
                    [-98.05879115664791, 26.012442816067686],
                    [-98.05896281801574, 26.00118042914975],
                    [-98.04934978141655, 25.997786073366555],
                    [-98.04849147457735, 25.97062769728191],
                    [-98.11406611709323, 25.969238748084706],
                    [-98.12144755591046, 25.969393076583184],
                    [-98.14582347014412, 26.009511613859633]
                ]
            ]
        }
    };
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "Nvo. Laredo";
    mun.icon = "/img/bandera.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -36];
    mun.oid = "7";
    mun.feature = {
        "type": "Feature",
        "properties": {
            "oid": "7",
            "name": "NVO. LAREDO",
            "zona": "Zona A",
            "noEscuelas": 1000,
            "noAlumnos": 5000,
            "topSeccion": {
                "mejor": "Reading",
                "peor": "Listening"
            },
            "generos": {
                "girls": 5000,
                "boys": 3500
            }
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-99.62801912448002, 27.48118430254863],
                    [-99.57858065054134, 27.539039871171365],
                    [-99.56484774111394, 27.546345778049773],
                    [-99.52158907641758, 27.54025755605588],
                    [-99.52845553113129, 27.498239632021203],
                    [-99.48588351190631, 27.50067589199169],
                    [-99.49755648491961, 27.424517295434267],
                    [-99.56484774111394, 27.361113278790096],
                    [-99.62801912448002, 27.48118430254863]
                ]
            ]
        }
    }
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "Altamira";
    mun.icon = "/img/alta.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -36];
    mun.oid = "8";
    mun.feature = {
        "type": "Feature",
        "properties": {
            "oid": "8",
            "name": "ALTAMIRA",
            "zona": "Zona C",
            "noEscuelas": 100,
            "noAlumnos": 50,
            "topSeccion": {
                "mejor": "Reading",
                "peor": "Listening"
            },
            "generos": {
                "girls": 10,
                "boys": 30
            }
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-97.94819296297116, 22.43208326736891],
                    [-97.91935385317362, 22.428592435346292],
                    [-97.91643560992028, 22.417960724352643],
                    [-97.90888250973521, 22.42081708489],
                    [-97.90184439365366, 22.417484658551547],
                    [-97.90201605502149, 22.414310844844135],
                    [-97.89652289125054, 22.413358686590907],
                    [-97.8948062775721, 22.42240392646913],
                    [-97.88639487054782, 22.424466793411252],
                    [-97.87901343173058, 22.41732596958856],
                    [-97.82450184225064, 22.325930436656456],
                    [-97.85523770646907, 22.32183049006172],
                    [-97.90055630757954, 22.325641588604988],
                    [-97.92364538736967, 22.384632178985104],
                    [-97.9325717784975, 22.392250836671863],
                    [-97.95334280400644, 22.383997272008465],
                    [-97.95866430640956, 22.41399345948487],
                    [-97.94819296297116, 22.43208326736891]
                ]
            ]
        }
    };
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "Matamoros";
    mun.icon = "/img/matamoros.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -36];
    mun.oid = "9";
    mun.feature = {
        "type": "Feature",
        "properties": {
            "oid": "9",
            "name": "MATAMOROS",
            "zona": "Zona A",
            "noEscuelas": 99,
            "noAlumnos": 60,
            "topSeccion": {
                "mejor": "Reading",
                "peor": "Listening"
            },
            "generos": {
                "girls": 30,
                "boys": 30
            }
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-97.6102164086061, 25.861624307446213],
                    [-97.58996036720066, 25.882012523847113],
                    [-97.55837467551761, 25.870583199503304],
                    [-97.565584452967, 25.89127873161766],
                    [-97.56283787108154, 25.91505866861266],
                    [-97.52232578827068, 25.886027969836373],
                    [-97.52198246553499, 25.886027969836373],
                    [-97.49726322856563, 25.89900001583128],
                    [-97.423792163129, 25.837524607895322],
                    [-97.52575901562751, 25.772925579164646],
                    [-97.54532841156157, 25.784982615546845],
                    [-97.6102164086061, 25.861624307446213]
                ]
            ]
        }
    };
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "Cd. Madero";
    mun.icon = "/img/negro.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -36];
    mun.oid = "10";
    mun.feature = {
        "type": "Feature",
        "properties": {
            "oid": "10",
            "name": "CD. MADERO",
            "zona": "Zona C",
            "noEscuelas": 11,
            "noAlumnos": 55,
            "topSeccion": {
                "mejor": "Reading",
                "peor": "Listening"
            },
            "generos": {
                "girls": 5220,
                "boys": 3502
            }
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-97.85507754733116, 22.321866904177472],
                    [-97.82040195102695, 22.325836795198434],
                    [-97.78435306377999, 22.263099320879792],
                    [-97.83670978092647, 22.231163876887752],
                    [-97.85765246780326, 22.246735301395717],
                    [-97.85507754733116, 22.321866904177472]
                ]
            ]
        }
    };
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "Reynosa";
    mun.icon = "/img/reynosa.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -36];
    mun.oid = "11";
    mun.feature = {
        "type": "Feature",
        "properties": {
            "oid": "11",
            "name": "REYNOSA",
            "zona": "Zona A",
            "noEscuelas": 890,
            "noAlumnos": 567,
            "topSeccion": {
                "mejor": "Reading",
                "peor": "Listening"
            },
            "generos": {
                "girls": 890,
                "boys": 120
            }
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-98.41038819970974, 26.039796175198273],
                    [-98.4189862672264, 26.058091445225106],
                    [-98.41627108801062, 26.07069319203008],
                    [-98.3972648335001, 26.069067236365342],
                    [-98.37825857898962, 26.088577214168122],
                    [-98.3619675042953, 26.154805562267406],
                    [-98.32531258428179, 26.122305542158966],
                    [-98.2664837012731, 26.121086615463],
                    [-98.25924322336435, 26.073132083198605],
                    [-98.17371507806708, 26.025971188906738],
                    [-98.1909112131004, 25.98285930736226],
                    [-98.29861332199323, 25.98530002499089],
                    [-98.31399933754935, 26.023937965272932],
                    [-98.39092941532995, 26.030037530480264],
                    [-98.40903061010185, 26.002790351482943],
                    [-98.41038819970974, 26.039796175198273]
                ]
            ]
        }
    };
    await mun.save();
}

iniciarEscuelas = async () => {

    const escuelas = [
        // ---------- CD. Victoria ----------
        {
            "nombre": "SIMON BOLIVAR",
            "clave": "28DPR0039O",
            "oid": "1",
            "coordenadas": [23.770388, -99.166567]
        },
        {
            "nombre": "PROF. JOSE MARTINEZ Y MARTINEZ",
            "clave": "28DPR0074U",
            "oid": "1",
            "coordenadas": [23.736474, -99.124508]
        },
        {
            "nombre": "PROF. EUTIMIO MARTINEZ LARA",
            "clave": "28DPR0513B",
            "oid": "1",
            "coordenadas": [23.70989, -99.183508]
        },
        {
            "nombre": "ANTONIO ALVAREZ BERRONES",
            "clave": "28DPR1121V",
            "oid": "1",
            "coordenadas": [23.718721, -99.166488]
        },
        {
            "nombre": "JUAN B. TIJERINA",
            "clave": "28DPR1125R",
            "oid": "1",
            "coordenadas": [23.731872453082364, -99.14007087731609]
        },
        {
            "nombre": "HIMNO NACIONAL",
            "clave": "28DPR1130C",
            "oid": "1",
            "coordenadas": [23.72704322, -99.14302198]
        },
        {
            "nombre": "ENRIQUE C. REBSAMEN",
            "clave": "28DPR1139U",
            "oid": "1",
            "coordenadas": [23.72713374, -99.15116719]
        },
        {
            "nombre": "CLUB DE LEONES",
            "clave": "28DPR1142H",
            "oid": "1",
            "coordenadas": [23.74179536, -99.1457142]
        },
        {
            "nombre": "CLUB ROTARIO",
            "clave": "28DPR1143G",
            "oid": "1",
            "coordenadas": [23.75039417, -99.15080548]
        },
        {
            "nombre": "LEONA VICARIO",
            "clave": "28DPR1169O",
            "oid": "1",
            "coordenadas": [23.72918223, -99.14831858]
        },
        {
            "nombre": "LA CORREGIDORA",
            "clave": "28DPR1173A",
            "oid": "1",
            "coordenadas": [23.732596793569613, -99.14015939021311]
        },
        {
            "nombre": "LIC. EMILIO PORTES GIL",
            "clave": "28DPR1593K",
            "oid": "1",
            "coordenadas": [23.7121682, -99.16121633]
        },
        {
            "nombre": "VENUSTIANO CARRANZA",
            "clave": "28DPR1686Z",
            "oid": "1",
            "coordenadas": [23.73404, -99.12955037]
        },
        {
            "nombre": "JOSE VASCONCELOS",
            "clave": "28DPR2098R",
            "oid": "1",
            "coordenadas": [23.75954203, -99.13413792]
        },
        {
            "nombre": "LAZARO CARDENAS DEL RIO",
            "clave": "28DPR2143N",
            "oid": "1",
            "coordenadas": [23.75040297, -99.13250601]
        },
        {
            "nombre": "IGNACIO JOSE ALLENDE",
            "clave": "28DPR2149H",
            "oid": "1",
            "coordenadas": [23.768071830219885, -99.15758734722662]
        },
        {
            "nombre": "IGNACIO LOPEZ RAYON",
            "clave": "28DPR2164Z",
            "oid": "1",
            "coordenadas": [23.728179923637672, -99.16756705522371]
        },
        {
            "nombre": "LIC. LUIS DONALDO COLOSIO MURRIETA",
            "clave": "28DPR2239Z",
            "oid": "1",
            "coordenadas": [23.7384367, -99.1126268]
        },
        {
            "nombre": "ELVIRA SALDAÑA MORALES",
            "clave": "28DPR2274F",
            "oid": "1",
            "coordenadas": [23.75469306, -99.17129694]
        },
        {
            "nombre": "DISTRIBUIDORES NISSAN NUM. 37",
            "clave": "28DPR2463Y",
            "oid": "1",
            "coordenadas": [23.78428023, -99.1733297]
        },
        // ---------- FIN CD. Victoria ----------
        // ---------- TULA ----------
        {
            "nombre": "DR. NORBERTO TREVIÑO ZAPATA",
            "clave": "28DPR1045F",
            "oid": "2",
            "coordenadas": [23.00002244, -99.70924656]
        },
        {
            "nombre": "MIGUEL HIDALGO",
            "clave": "28DPR1340H",
            "oid": "2",
            "coordenadas": [22.99773381, -99.70925208]
        },
        {
            "nombre": "NIÑOS HEROES",
            "clave": "28DPR1344D",
            "oid": "2",
            "coordenadas": [22.99298302, -99.72418659]
        },
        // ---------- FIN TULA -------------
        // ---------- SOTO La Marina -------
        {
            "nombre": "LAZARO CARDENAS",
            "clave": "28DPR1533W",
            "oid": "3",
            "coordenadas": [23.77377263, -98.20234959]
        },
        {
            "nombre": "GRAL. FELIPE DE LA GARZA",
            "clave": "28DPR1663P",
            "oid": "3",
            "coordenadas": [23.76458968, -98.20735675]
        },
        // ---------- FIN SOTO la marina --------
        // ---------- PADILLA -----------
        {
            "nombre": "MIGUEL HIDALGO",
            "clave": "28DPR1748W",
            "oid": "4",
            "coordenadas": [24.04848215, -98.90129189]
        },
        // ---------- FIN PADILLA -----------
        // ---------- TAMPICO ------------
        {
            "nombre": "JUSTO SIERRA",
            "clave": "28DPR1454J",
            "oid": "5",
            "coordenadas": [22.31356155, -97.88339168]
        },
        {
            "nombre": "GRAL. CESAR LOPEZ DE LARA",
            "clave": "28DPR1817B",
            "oid": "5",
            "coordenadas": [22.29680335, -97.88945075]
        },
        {
            "nombre": "ARTEMIO VILLAFAÑA PADILLA",
            "clave": "28DPR2182P",
            "oid": "5",
            "coordenadas": [22.31688547, -97.85958457]
        },
        // ---------- FIN TAMPICO ----------
        // ---------- RIO BRAVO -----------
        {
            "nombre": "MIGUEL HIDALGO",
            "clave": "28DPR0829Z",
            "oid": "6",
            "coordenadas": [25.98724265, -98.08665914]
        },
        {
            "nombre": "MAGDALENO AGUILAR",
            "clave": "28DPR0979G",
            "oid": "6",
            "coordenadas": [25.99007226, -98.11731267]
        },
        {
            "nombre": "MARGARITA MAZA DE JUAREZ",
            "clave": "28DPR1505Z",
            "oid": "6",
            "coordenadas": [25.99078661, -98.07852247]
        },
        {
            "nombre": "ALBERTO CARRERA TORRES",
            "clave": "28DPR2064A",
            "oid": "6",
            "coordenadas": [25.99271507, -98.06541701]
        },
        // ----------- FIN Rio Bravo -----------
        // ----------- NVO LAREDO --------
        {
            "nombre": "PROF. SANTOS GUZMAN TREVIÑO",
            "clave": "28DPR0694B",
            "oid": "7",
            "coordenadas": [27.49078715711538, -99.55702374848839]
        },
        {
            "nombre": "PROF. COSME PEREZ NUM. 2",
            "clave": "28DPR0787R",
            "oid": "7",
            "coordenadas": [27.490235306407293, -99.5275377503077]
        },
        {
            "nombre": "LEYES DE REFORMA",
            "clave": "28DPR1360V",
            "oid": "7",
            "coordenadas": [27.50395290450436, -99.55291807651616]
        },
        {
            "nombre": "CORLA MA. DE JESUS DE LA ROSA",
            "clave": "28DPR1372Z",
            "oid": "7",
            "coordenadas": [27.488140834908652, -99.53726837913511]
        },
        {
            "nombre": "NOGAL NUM. 1",
            "clave": "28DPR1377V",
            "oid": "7",
            "coordenadas": [27.444305939718774, -99.52432385399783]
        },
        {
            "nombre": "EMILIANO ZAPATA",
            "clave": "28DPR1698E",
            "oid": "7",
            "coordenadas": [27.50784662805317, -99.54388838656061]
        },
        {
            "nombre": "CARLOS A. CARRILLO",
            "clave": "28DPR1826J",
            "oid": "7",
            "coordenadas": [27.483394465769138, -99.51200577181751]
        },
        {
            "nombre": "NACIONES UNIDAS",
            "clave": "28DPR1892I",
            "oid": "7",
            "coordenadas": [27.484608364821806, -99.56272055952006]
        },
        {
            "nombre": "PEDRO JOSE MENDEZ",
            "clave": "28DPR2174G",
            "oid": "7",
            "coordenadas": [27.464741411157217, -99.55094182079071]
        },
        {
            "nombre": "FELIPE DURON ROBLES",
            "clave": "28DPR2298P",
            "oid": "7",
            "coordenadas": [27.464830222174147, -99.5540638757164]
        },
        {
            "nombre": "PROF. ALONSO BRICEÑO ROSALES",
            "clave": "28DPR2363Z",
            "oid": "7",
            "coordenadas": [27.51093775469948, -99.59128861344416]
        },
        {
            "nombre": "PROFA. EMMA PEREZ IBARRA",
            "clave": "28DPR2415O",
            "oid": "7",
            "coordenadas": [27.50887226874411, -99.60687072753736]
        },
        {
            "nombre": "MAURICIO GONZALEZ DE LA GARZA",
            "clave": "28DPR2431F",
            "oid": "7",
            "coordenadas": [27.473026279758795, -99.62262565642212]
        },
        {
            "nombre": "PROF. CECILIO JESUS CASTILLO CASTILLO",
            "clave": "28DPR2439Y",
            "oid": "7",
            "coordenadas": [27.459281900139853, -99.57770774719292]
        },
        {
            "nombre": "EUTIMIO RODRIGUEZ CABALLERO",
            "clave": "28DPR2474D",
            "oid": "7",
            "coordenadas": [27.459281900139853, -99.57770774719292]
        },
        // ----------- FIN NVO LAREDO --------
        // ----------- ALTAMIRA --------------
        {
            "nombre": "MARTIRES DE LA REVOLUCION",
            "clave": "28DPR0834L",
            "oid": "8",
            "coordenadas": [22.396771178616564, -97.93663107736035]
        },
        {
            "nombre": "MARTIRES DE LA REVOLUCION",
            "clave": "28DPR1066S",
            "oid": "8",
            "coordenadas": [22.39679814379965, -97.93662469575138]
        },
        {
            "nombre": "FRANCISCO I. MADERO",
            "clave": "28DPR1094O",
            "oid": "8",
            "coordenadas": [22.3560721163494, -97.88475570304878]
        },
        {
            "nombre": "ALVARO OBREGON",
            "clave": "28DPR2021C",
            "oid": "8",
            "coordenadas": [22.327572661200087, -97.86524266009506]
        },
        {
            "nombre": "DIANA LAURA RIOJAS DE COLOSIO",
            "clave": "28DPR2310U",
            "oid": "8",
            "coordenadas": [22.325334736181603, -97.85770880489773]
        },
        {
            "nombre": "NUEVO SANTANDER",
            "clave": "28DPR2377B",
            "oid": "8",
            "coordenadas": [22.363862753896022, -97.90415589202891]
        },
        {
            "nombre": "PROFA. MARIA GUADALUPE JAIME GARZA",
            "clave": "28DPR2422Y",
            "oid": "8",
            "coordenadas": [22.390743039307043, -97.9119321865067]
        },
        {
            "nombre": "PROF. CLEMENTE RIVERA MOCTEZUMA",
            "clave": "28DPR2461Z",
            "oid": "8",
            "coordenadas": [22.395845399497734, -97.93695204662711]
        },
        {
            "nombre": "20 DE NOVIEMBRE",
            "clave": "28DPR2562Y",
            "oid": "8",
            "coordenadas": [22.368851323498344, -97.8712973157016]
        },
        {
            "nombre": "PROF. JUAN CAMACHO CERVANTES",
            "clave": "28DPR1400F",
            "oid": "8",
            "coordenadas": [22.329963750926982, -97.8793409914044]
        },
        /// ------------ FIN ALTAMIRA ------------
        // ------------- Mtamoros --------------
        {
            "nombre": "FRANKLIN D. ROOSEVELT",
            "clave": "28DPR0456A",
            "oid": "9",
            "coordenadas": [25.88295323986773, -97.51014299696635]
        },
        {
            "nombre": "FIDEL VELAZQUEZ",
            "clave": "28DPR0457Z",
            "oid": "9",
            "coordenadas": [25.836009656436072, -97.52818390674665]
        },
        {
            "nombre": "CUAUHTEMOC",
            "clave": "28DPR0461M",
            "oid": "9",
            "coordenadas": [25.85787194211958, -97.48079927976002]
        },
        {
            "nombre": "MODELO",
            "clave": "28DPR0477N",
            "oid": "9",
            "coordenadas": [25.877318020649128, -97.49800214352872]
        },
        {
            "nombre": "JOSEFINA MENCHACA",
            "clave": "28DPR0489S",
            "oid": "9",
            "coordenadas": [25.878786338976013, -97.50322785399783]
        },
        {
            "nombre": "TAMAULIPAS",
            "clave": "28DPR0636L",
            "oid": "9",
            "coordenadas": [25.834331646727932, -97.50239135452401]
        },
        {
            "nombre": "GRAL. LAZARO CARDENAS DEL RIO",
            "clave": "28DPR1283G",
            "oid": "9",
            "coordenadas": [25.814349203338427, -97.5182210637561]
        },
        {
            "nombre": "NIÑOS HEROES",
            "clave": "28DPR1492M",
            "oid": "9",
            "coordenadas": [25.86888974732135, -97.48344238890638]
        },
        {
            "nombre": "GRAL. LAZARO CARDENAS DEL RIO",
            "clave": "28DPR1807V",
            "oid": "9",
            "coordenadas": [25.87559864141487, -97.52484938890636]
        },
        {
            "nombre": "NACIONES UNIDAS",
            "clave": "28DPR1879O",
            "oid": "9",
            "coordenadas": [25.83737103102983, -97.5192425079465]
        },
        {
            "nombre": "PLUTARCO ELIAS CALLES",
            "clave": "28DPR2005L",
            "oid": "9",
            "coordenadas": [25.838134753860235, -97.4865520208399]
        },
        {
            "nombre": "RAMON LOPEZ VELARDE",
            "clave": "28DPR2160D",
            "oid": "9",
            "coordenadas": [25.8503257934397, -97.53292783928009]
        },
        {
            "nombre": "ORALIA GUERRA DE VILLARREAL",
            "clave": "28DPR2173H",
            "oid": "9",
            "coordenadas": [25.846322078869875, -97.48109615212432]
        },
        {
            "nombre": "PROF. ERNESTO GUAJARDO SALINAS",
            "clave": "28DPR2271I",
            "oid": "9",
            "coordenadas": [25.838070296876257, -97.4605590085956]
        },
        {
            "nombre": "PROF. CRUZ LINO MARQUEZ",
            "clave": "28DPR2300N",
            "oid": "9",
            "coordenadas": [25.820422812026333, -97.45577786011998]
        },
        {
            "nombre": "PROFA. JULIA GARCIA ECHAVARRIA",
            "clave": "28DPR2300N",
            "oid": "9",
            "coordenadas": [25.85632413694574, -97.52659230424862]
        },
        {
            "nombre": "PROF. Y LIC. SANTOS VALLE CARDONA",
            "clave": "28DPR2390W",
            "oid": "9",
            "coordenadas": [25.82020825165025, -97.53781113623131]
        },
        {
            "nombre": "PROF. IGNACIO AGUILAR HERNANDEZ",
            "clave": "28DPR2391V",
            "oid": "9",
            "coordenadas": [25.8567509763884, -97.53871542199057]
        },
        {
            "nombre": "CLUB ROTARIO 65373913c1ab3bd66a190020 NUM. 84",
            "clave": "28DPR2410T",
            "oid": "9",
            "coordenadas": [25.827292757140075, -97.47809539385328]
        },
        {
            "nombre": "RODOLFO TORRE CANTU",
            "clave": "28DPR2587G",
            "oid": "9",
            "coordenadas": [25.84418134423308, -97.552720203688]
        },
        // ----------- FIN MATAMOROS -----------
        // ----------- CD. Madero -------------
        {
            "nombre": "PROFA. MA. GUADALUPE GARCIA GARCIA",
            "clave": "28DPR0283Z",
            "oid": "10",
            "coordenadas": [22.26678127, -97.84670241]
        },
        {
            "nombre": "PROFA. AURELIA GARCIA RODRIGUEZ",
            "clave": "28DPR1332Z",
            "oid": "10",
            "coordenadas": [22.26627837, -97.81585622]
        },
        {
            "nombre": "ARMANDO BARBA",
            "clave": "28DPR1343E",
            "oid": "10",
            "coordenadas": [22.24839618, -97.83666052]
        },
        {
            "nombre": "EMILIANO ZAPATA",
            "clave": "28DPR1412K",
            "oid": "10",
            "coordenadas": [22.27651719, -97.83812316]
        },
        {
            "nombre": "GERARDO GOMEZ CASTILLO",
            "clave": "28DPR1414I",
            "oid": "10",
            "coordenadas": [22.25935875, -97.84980481]
        },
        {
            "nombre": "ARTICULO 3 CONSTITUCIONAL",
            "clave": "28DPR2045M",
            "oid": "10",
            "coordenadas": [22.30321656, -97.84555324]
        },
        {
            "nombre": "PROFA. JUANA MARIA CABRERA SALINAS",
            "clave": "28DPR2334D",
            "oid": "10",
            "coordenadas": [22.29568885, -97.8216019]
        },
        // ------------ FIN CD. MADERO ---------
        // ------------ REYNOSA ----------------
        {
            "nombre": "ENRIQUE C. REBSAMEN",
            "clave": "28DPR0085Z",
            "oid": "11",
            "coordenadas": [26.07253259, -98.30021881]
        },
        {
            "nombre": "FORD NUM. 16",
            "clave": "28DPR0754Z",
            "oid": "11",
            "coordenadas": [26.06222489, -98.28998255]
        },
        {
            "nombre": "PROF. FRANCISCO NICODEMO",
            "clave": "28DPR0770R",
            "oid": "11",
            "coordenadas": [26.06245877, -98.3129181]
        },
        {
            "nombre": "MIGUEL HIDALGO",
            "clave": "28DPR0774N",
            "oid": "11",
            "coordenadas": [26.090797, -98.27987153]
        },
        {
            "nombre": "ARTICULO 27 CONSTITUCIONAL",
            "clave": "28DPR0806P",
            "oid": "11",
            "coordenadas": [26.14604488, -98.34815524]
        },
        {
            "nombre": "FELIPE CARRILLO PUERTO",
            "clave": "28DPR1403C",
            "oid": "11",
            "coordenadas": [26.07051272, -98.32084586]
        },
        {
            "nombre": "EL CHAMIZAL",
            "clave": "28DPR1427M",
            "oid": "11",
            "coordenadas": [26.05310939, -98.37875574]
        },
        {
            "nombre": "GRAL. EMILIANO ZAPATA",
            "clave": "28DPR1433X",
            "oid": "11",
            "coordenadas": [26.0509989, -98.29787957]
        },
        {
            "nombre": "IGNACIO MANUEL 65373913c1ab3bd66a19001eNO",
            "clave": "28DPR1515G",
            "oid": "11",
            "coordenadas": [26.06872585, -98.34598395]
        },
        {
            "nombre": "HEROES DE LA INDEPENDENCIA DE MEXICO",
            "clave": "28DPR2047K",
            "oid": "11",
            "coordenadas": [26.05389537, -98.37802718]
        },
        {
            "nombre": "FELIPE ANGELES",
            "clave": "28DPR2081R",
            "oid": "11",
            "coordenadas": [26.01716916, -98.26412805]
        },
        {
            "nombre": "RAUL FLORES GARCIA",
            "clave": "28DPR2381O",
            "oid": "11",
            "coordenadas": [26.03747728, -98.35955164]
        },
        {
            "nombre": "MOCTEZUMA",
            "clave": "28DPR2452S",
            "oid": "11",
            "coordenadas": [26.006122, -98.246341]
        },
        {
            "nombre": "ARQUIMEDES CABALLERO CABALLERO",
            "clave": "28DPR2481N",
            "oid": "11",
            "coordenadas": [26.006122, -98.246341]
        },
        {
            "nombre": "JULIAN ERNESTO ZAMORA RIVAS",
            "clave": "28DPR2504H",
            "oid": "11",
            "coordenadas": [26.0060771051489, -98.24654573812798]
        }
        // -------------- FIN Reynosa ----------
    ];

    for (let esc of escuelas) {
        const newEscuela = new escuelaModel();
        newEscuela.nombre = esc.nombre;
        newEscuela.clave = esc.clave;
        newEscuela.coordenadas = esc.coordenadas;
        newEscuela.oid = esc.oid;

        await newEscuela.save();
    }

}

iniciarZona = async () => {
    let zona = new zonaModel();
    zona.nombre = "Zona A";
    zona.oid = [
        7, 11, 6, 9
    ];
    zona.feature = {
        "type": "Feature",
        "properties": {
            "name": "Zona A",
            "mejorEscuela": "Belmont state",
            "noEscuelas": 5000,
            "noAlumnos": 8000,
            "noMunicipios": 4,
            "topSeccion": {
                "mejor": "Reading",
                "peor": "Listening"
            },
            "generos": {
                "girls": 5010,
                "boys": 3510
            },
            "oid": [
                7, 11, 6, 9
            ]
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-99.74871278414581, 27.680399224230158],
                    [-97.50750196559211, 25.875815438575216],
                    [-97.16692581179227, 25.95486784079166],
                    [-97.7272285164307, 24.40392042372974],
                    [-99.61687685364265, 24.503928340227063],
                    [-98.6061347197851, 26.033867187697794],
                    [-99.9684393349844, 27.53436727828923],
                    [-99.74871278414581, 27.680399224230158]
                ]
            ]
        }
    }
    await zona.save();

    zona = new zonaModel();
    zona.nombre = "Zona B";
    zona.oid = [
        4, 1, 3
    ];
    zona.feature = {
        "type": "Feature",
        "properties": {
            "name": "Zona B",
            "mejorEscuela": "Belmont state x2",
            "noEscuelas": 5100,
            "noAlumnos": 8200,
            "noMunicipios": 3,
            "topSeccion": {
                "mejor": "Reading",
                "peor": "Listening"
            },
            "generos": {
                "girls": 5510,
                "boys": 3510
            },
            "oid": [
                4, 1, 3
            ]
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-99.61687685364265, 24.503928340227063],
                    [-97.7272285164307, 24.40392042372974],
                    [-97.77392044288501, 23.32387980781899],
                    [-99.96019962372908, 23.560748488339485],
                    [-99.61687685364265, 24.503928340227063],
                ]
            ]
        }
    }

    await zona.save();

    zona = new zonaModel();
    zona.nombre = "Zona C";
    zona.oid = [
        2, 10, 5, 8
    ];
    zona.feature = {
        "type": "Feature",
        "properties": {
            "name": "Zona C",
            "mejorEscuela": "Belmont state x3",
            "noEscuelas": 8000,
            "noAlumnos": 8000,
            "noMunicipios": 4,
            "topSeccion": {
                "mejor": "Reading",
                "peor": "Listening"
            },
            "generos": {
                "girls": 510,
                "boys": 3510
            },
            "oid": [
                2, 10, 5, 8
            ]
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-97.77392044288501, 23.32387980781899],
                    [-99.96019962372908, 23.560748488339485],
                    [-100.09203555423224, 22.757728068548516],
                    [-97.76636729350344, 22.1663293622925],
                    [-97.77392044288501, 23.32387980781899],
                ]
            ]
        }
    }

    await zona.save();


}

module.exports = estanciarCtrl;