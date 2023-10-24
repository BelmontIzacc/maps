const estanciarCtrl = {};

// models
const escuelaModel = require("../model/escuela");
const municipioModel = require("../model/municipio");

estanciarCtrl.iniciar = async (req, res) => {
    // await iniciarMunicipio();
    // await iniciarEscuelas();
}

iniciarMunicipio = async () => {
    let mun = new municipioModel();
    mun.nombre = "CD. VICTORIA";
    mun.icon = "/img/verde.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -76];
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "TULA";
    mun.icon = "/img/rojo.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -76];
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "SOTO LA MARINA";
    mun.icon = "/img/azul.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -76];
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "PADILLA";
    mun.icon = "/img/beige.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -76];
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "TAMPICO";
    mun.icon = "/img/nazul.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -76];
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "RIO BRAVO";
    mun.icon = "/img/cverde.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -76];
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "NVO. LAREDO";
    mun.icon = "/img/bandera.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -76];
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "65373913c1ab3bd66a19001e";
    mun.icon = "/img/alta.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -76];
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "65373913c1ab3bd66a190020";
    mun.icon = "/img/65373913c1ab3bd66a190020.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -76];
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "65373913c1ab3bd66a190022";
    mun.icon = "/img/negro.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -76];
    await mun.save();

    mun = new municipioModel();
    mun.nombre = "65373914c1ab3bd66a190024";
    mun.icon = "/img/65373914c1ab3bd66a190024.png";
    mun.iconSize = [35, 45];
    mun.iconAnchor = [22, 94];
    mun.popupAnchor = [-3, -76];
    await mun.save();
}

iniciarEscuelas = async () => {

    const escuelas = [
        {
            "nombre": "SIMON BOLIVAR",
            "clave": "28DPR0039O",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.770388, -99.166567]
        },
        {
            "nombre": "PROF. JOSE MARTINEZ Y MARTINEZ",
            "clave": "28DPR0074U",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.736474, -99.124508]
        },
        {
            "nombre": "PROF. EUTIMIO MARTINEZ LARA",
            "clave": "28DPR0513B",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.70989, -99.183508]
        },
        {
            "nombre": "ANTONIO ALVAREZ BERRONES",
            "clave": "28DPR1121V",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.718721, -99.166488]
        },
        {
            "nombre": "JUAN B. TIJERINA",
            "clave": "28DPR1125R",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.731872453082364, -99.14007087731609]
        },
        {
            "nombre": "HIMNO NACIONAL",
            "clave": "28DPR1130C",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.72704322, -99.14302198]
        },
        {
            "nombre": "ENRIQUE C. REBSAMEN",
            "clave": "28DPR1139U",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.72713374, -99.15116719]
        },
        {
            "nombre": "CLUB DE LEONES",
            "clave": "28DPR1142H",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.74179536, -99.1457142]
        },
        {
            "nombre": "CLUB ROTARIO",
            "clave": "28DPR1143G",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.75039417, -99.15080548]
        },
        {
            "nombre": "LEONA VICARIO",
            "clave": "28DPR1169O",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.72918223, -99.14831858]
        },
        {
            "nombre": "LA CORREGIDORA",
            "clave": "28DPR1173A",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.732596793569613, -99.14015939021311]
        },
        {
            "nombre": "LIC. EMILIO PORTES GIL",
            "clave": "28DPR1593K",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.7121682, -99.16121633]
        },
        {
            "nombre": "VENUSTIANO CARRANZA",
            "clave": "28DPR1686Z",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.73404, -99.12955037]
        },
        {
            "nombre": "JOSE VASCONCELOS",
            "clave": "28DPR2098R",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.75954203, -99.13413792]
        },
        {
            "nombre": "LAZARO CARDENAS DEL RIO",
            "clave": "28DPR2143N",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.75040297, -99.13250601]
        },
        {
            "nombre": "IGNACIO JOSE ALLENDE",
            "clave": "28DPR2149H",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.768071830219885, -99.15758734722662]
        },
        {
            "nombre": "IGNACIO LOPEZ RAYON",
            "clave": "28DPR2164Z",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.728179923637672, -99.16756705522371]
        },
        {
            "nombre": "LIC. LUIS DONALDO COLOSIO MURRIETA",
            "clave": "28DPR2239Z",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.7384367, -99.1126268]
        },
        {
            "nombre": "ELVIRA SALDAÑA MORALES",
            "clave": "28DPR2274F",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.75469306, -99.17129694]
        },
        {
            "nombre": "DISTRIBUIDORES NISSAN NUM. 37",
            "clave": "28DPR2463Y",
            "municipio": "65373912c1ab3bd66a190010",
            "coordenadas": [23.78428023, -99.1733297]
        },
        {
            "nombre": "DR. NORBERTO TREVIÑO ZAPATA",
            "clave": "28DPR1045F",
            "municipio": "65373913c1ab3bd66a190012",
            "coordenadas": [23.00002244, -99.70924656]
        },
        {
            "nombre": "MIGUEL HIDALGO",
            "clave": "28DPR1340H",
            "municipio": "65373913c1ab3bd66a190012",
            "coordenadas": [22.99773381, -99.70925208]
        },
        {
            "nombre": "NIÑOS HEROES",
            "clave": "28DPR1344D",
            "municipio": "65373913c1ab3bd66a190012",
            "coordenadas": [22.99298302, -99.72418659]
        },
        {
            "nombre": "LAZARO CARDENAS",
            "clave": "28DPR1533W",
            "municipio": "65373913c1ab3bd66a190014",
            "coordenadas": [23.77377263, -98.20234959]
        },
        {
            "nombre": "GRAL. FELIPE DE LA GARZA",
            "clave": "28DPR1663P",
            "municipio": "65373913c1ab3bd66a190014",
            "coordenadas": [23.76458968, -98.20735675]
        },
        {
            "nombre": "MIGUEL HIDALGO",
            "clave": "28DPR1748W",
            "municipio": "65373913c1ab3bd66a190016",
            "coordenadas": [24.04848215, -98.90129189]
        },
        {
            "nombre": "JUSTO SIERRA",
            "clave": "28DPR1454J",
            "municipio": "65373913c1ab3bd66a190018",
            "coordenadas": [22.31356155, -97.88339168]
        },
        {
            "nombre": "GRAL. CESAR LOPEZ DE LARA",
            "clave": "28DPR1817B",
            "municipio": "65373913c1ab3bd66a190018",
            "coordenadas": [22.29680335, -97.88945075]
        },
        {
            "nombre": "ARTEMIO VILLAFAÑA PADILLA",
            "clave": "28DPR2182P",
            "municipio": "65373913c1ab3bd66a190018",
            "coordenadas": [22.31688547, -97.85958457]
        },
        {
            "nombre": "MIGUEL HIDALGO",
            "clave": "28DPR0829Z",
            "municipio": "65373913c1ab3bd66a19001a",
            "coordenadas": [25.98724265, -98.08665914]
        },
        {
            "nombre": "MAGDALENO AGUILAR",
            "clave": "28DPR0979G",
            "municipio": "65373913c1ab3bd66a19001a",
            "coordenadas": [25.99007226, -98.11731267]
        },
        {
            "nombre": "MARGARITA MAZA DE JUAREZ",
            "clave": "28DPR1505Z",
            "municipio": "65373913c1ab3bd66a19001a",
            "coordenadas": [25.99078661, -98.07852247]
        },
        {
            "nombre": "ALBERTO CARRERA TORRES",
            "clave": "28DPR2064A",
            "municipio": "65373913c1ab3bd66a19001a",
            "coordenadas": [25.99271507, -98.06541701]
        },
        {
            "nombre": "PROF. SANTOS GUZMAN TREVIÑO",
            "clave": "28DPR0694B",
            "municipio": "65373913c1ab3bd66a19001c",
            "coordenadas": [27.49078715711538, -99.55702374848839]
        },
        {
            "nombre": "PROF. COSME PEREZ NUM. 2",
            "clave": "28DPR0787R",
            "municipio": "65373913c1ab3bd66a19001c",
            "coordenadas": [27.490235306407293, -99.5275377503077]
        },
        {
            "nombre": "LEYES DE REFORMA",
            "clave": "28DPR1360V",
            "municipio": "65373913c1ab3bd66a19001c",
            "coordenadas": [27.50395290450436, -99.55291807651616]
        },
        {
            "nombre": "CORLA MA. DE JESUS DE LA ROSA",
            "clave": "28DPR1372Z",
            "municipio": "65373913c1ab3bd66a19001c",
            "coordenadas": [27.488140834908652, -99.53726837913511]
        },
        {
            "nombre": "NOGAL NUM. 1",
            "clave": "28DPR1377V",
            "municipio": "65373913c1ab3bd66a19001c",
            "coordenadas": [27.444305939718774, -99.52432385399783]
        },
        {
            "nombre": "EMILIANO ZAPATA",
            "clave": "28DPR1698E",
            "municipio": "65373913c1ab3bd66a19001c",
            "coordenadas": [27.50784662805317, -99.54388838656061]
        },
        {
            "nombre": "CARLOS A. CARRILLO",
            "clave": "28DPR1826J",
            "municipio": "65373913c1ab3bd66a19001c",
            "coordenadas": [27.483394465769138, -99.51200577181751]
        },
        {
            "nombre": "NACIONES UNIDAS",
            "clave": "28DPR1892I",
            "municipio": "65373913c1ab3bd66a19001c",
            "coordenadas": [27.484608364821806, -99.56272055952006]
        },
        {
            "nombre": "PEDRO JOSE MENDEZ",
            "clave": "28DPR2174G",
            "municipio": "65373913c1ab3bd66a19001c",
            "coordenadas": [27.464741411157217, -99.55094182079071]
        },
        {
            "nombre": "FELIPE DURON ROBLES",
            "clave": "28DPR2298P",
            "municipio": "65373913c1ab3bd66a19001c",
            "coordenadas": [27.464830222174147, -99.5540638757164]
        },
        {
            "nombre": "PROF. ALONSO BRICEÑO ROSALES",
            "clave": "28DPR2363Z",
            "municipio": "65373913c1ab3bd66a19001c",
            "coordenadas": [27.51093775469948, -99.59128861344416]
        },
        {
            "nombre": "PROFA. EMMA PEREZ IBARRA",
            "clave": "28DPR2415O",
            "municipio": "65373913c1ab3bd66a19001c",
            "coordenadas": [27.50887226874411, -99.60687072753736]
        },
        {
            "nombre": "MAURICIO GONZALEZ DE LA GARZA",
            "clave": "28DPR2431F",
            "municipio": "65373913c1ab3bd66a19001c",
            "coordenadas": [27.473026279758795, -99.62262565642212]
        },
        {
            "nombre": "PROF. CECILIO JESUS CASTILLO CASTILLO",
            "clave": "28DPR2439Y",
            "municipio": "65373913c1ab3bd66a19001c",
            "coordenadas": [27.459281900139853, -99.57770774719292]
        },
        {
            "nombre": "EUTIMIO RODRIGUEZ CABALLERO",
            "clave": "28DPR2474D",
            "municipio": "65373913c1ab3bd66a19001c",
            "coordenadas": [27.459281900139853, -99.57770774719292]
        },
        {
            "nombre": "MARTIRES DE LA REVOLUCION",
            "clave": "28DPR0834L",
            "municipio": "65373913c1ab3bd66a19001e",
            "coordenadas": [22.396771178616564, -97.93663107736035]
        },
        {
            "nombre": "MARTIRES DE LA REVOLUCION",
            "clave": "28DPR1066S",
            "municipio": "65373913c1ab3bd66a19001e",
            "coordenadas": [22.39679814379965, -97.93662469575138]
        },
        {
            "nombre": "FRANCISCO I. MADERO",
            "clave": "28DPR1094O",
            "municipio": "65373913c1ab3bd66a19001e",
            "coordenadas": [22.3560721163494, -97.88475570304878]
        },
        {
            "nombre": "ALVARO OBREGON",
            "clave": "28DPR2021C",
            "municipio": "65373913c1ab3bd66a19001e",
            "coordenadas": [22.327572661200087, -97.86524266009506]
        },
        {
            "nombre": "DIANA LAURA RIOJAS DE COLOSIO",
            "clave": "28DPR2310U",
            "municipio": "65373913c1ab3bd66a19001e",
            "coordenadas": [22.325334736181603, -97.85770880489773]
        },
        {
            "nombre": "NUEVO SANTANDER",
            "clave": "28DPR2377B",
            "municipio": "65373913c1ab3bd66a19001e",
            "coordenadas": [22.363862753896022, -97.90415589202891]
        },
        {
            "nombre": "PROFA. MARIA GUADALUPE JAIME GARZA",
            "clave": "28DPR2422Y",
            "municipio": "65373913c1ab3bd66a19001e",
            "coordenadas": [22.390743039307043, -97.9119321865067]
        },
        {
            "nombre": "PROF. CLEMENTE RIVERA MOCTEZUMA",
            "clave": "28DPR2461Z",
            "municipio": "65373913c1ab3bd66a19001e",
            "coordenadas": [22.395845399497734, -97.93695204662711]
        },
        {
            "nombre": "20 DE NOVIEMBRE",
            "clave": "28DPR2562Y",
            "municipio": "65373913c1ab3bd66a19001e",
            "coordenadas": [22.368851323498344, -97.8712973157016]
        },
        {
            "nombre": "PROF. JUAN CAMACHO CERVANTES",
            "clave": "28DPR1400F",
            "municipio": "65373913c1ab3bd66a19001e",
            "coordenadas": [22.329963750926982, -97.8793409914044]
        },
        {
            "nombre": "FRANKLIN D. ROOSEVELT",
            "clave": "28DPR0456A",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.88295323986773, -97.51014299696635]
        },
        {
            "nombre": "FIDEL VELAZQUEZ",
            "clave": "28DPR0457Z",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.836009656436072, -97.52818390674665]
        },
        {
            "nombre": "CUAUHTEMOC",
            "clave": "28DPR0461M",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.85787194211958, -97.48079927976002]
        },
        {
            "nombre": "MODELO",
            "clave": "28DPR0477N",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.877318020649128, -97.49800214352872]
        },
        {
            "nombre": "JOSEFINA MENCHACA",
            "clave": "28DPR0489S",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.878786338976013, -97.50322785399783]
        },
        {
            "nombre": "TAMAULIPAS",
            "clave": "28DPR0636L",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.834331646727932, -97.50239135452401]
        },
        {
            "nombre": "GRAL. LAZARO CARDENAS DEL RIO",
            "clave": "28DPR1283G",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.814349203338427, -97.5182210637561]
        },
        {
            "nombre": "NIÑOS HEROES",
            "clave": "28DPR1492M",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.86888974732135, -97.48344238890638]
        },
        {
            "nombre": "GRAL. LAZARO CARDENAS DEL RIO",
            "clave": "28DPR1807V",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.87559864141487, -97.52484938890636]
        },
        {
            "nombre": "NACIONES UNIDAS",
            "clave": "28DPR1879O",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.83737103102983, -97.5192425079465]
        },
        {
            "nombre": "PLUTARCO ELIAS CALLES",
            "clave": "28DPR2005L",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.838134753860235, -97.4865520208399]
        },
        {
            "nombre": "RAMON LOPEZ VELARDE",
            "clave": "28DPR2160D",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.8503257934397, -97.53292783928009]
        },
        {
            "nombre": "ORALIA GUERRA DE VILLARREAL",
            "clave": "28DPR2173H",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.846322078869875, -97.48109615212432]
        },
        {
            "nombre": "PROF. ERNESTO GUAJARDO SALINAS",
            "clave": "28DPR2271I",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.838070296876257, -97.4605590085956]
        },
        {
            "nombre": "PROF. CRUZ LINO MARQUEZ",
            "clave": "28DPR2300N",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.820422812026333, -97.45577786011998]
        },
        {
            "nombre": "PROFA. JULIA GARCIA ECHAVARRIA",
            "clave": "28DPR2300N",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.85632413694574, -97.52659230424862]
        },
        {
            "nombre": "PROF. Y LIC. SANTOS VALLE CARDONA",
            "clave": "28DPR2390W",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.82020825165025, -97.53781113623131]
        },
        {
            "nombre": "PROF. IGNACIO AGUILAR HERNANDEZ",
            "clave": "28DPR2391V",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.8567509763884, -97.53871542199057]
        },
        {
            "nombre": "CLUB ROTARIO 65373913c1ab3bd66a190020 NUM. 84",
            "clave": "28DPR2410T",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.827292757140075, -97.47809539385328]
        },
        {
            "nombre": "RODOLFO TORRE CANTU",
            "clave": "28DPR2587G",
            "municipio": "65373913c1ab3bd66a190020",
            "coordenadas": [25.84418134423308, -97.552720203688]
        },
        {
            "nombre": "PROFA. MA. GUADALUPE GARCIA GARCIA",
            "clave": "28DPR0283Z",
            "municipio": "65373913c1ab3bd66a190022",
            "coordenadas": [22.26678127, -97.84670241]
        },
        {
            "nombre": "PROFA. AURELIA GARCIA RODRIGUEZ",
            "clave": "28DPR1332Z",
            "municipio": "65373913c1ab3bd66a190022",
            "coordenadas": [22.26627837, -97.81585622]
        },
        {
            "nombre": "ARMANDO BARBA",
            "clave": "28DPR1343E",
            "municipio": "65373913c1ab3bd66a190022",
            "coordenadas": [22.24839618, -97.83666052]
        },
        {
            "nombre": "EMILIANO ZAPATA",
            "clave": "28DPR1412K",
            "municipio": "65373913c1ab3bd66a190022",
            "coordenadas": [22.27651719, -97.83812316]
        },
        {
            "nombre": "GERARDO GOMEZ CASTILLO",
            "clave": "28DPR1414I",
            "municipio": "65373913c1ab3bd66a190022",
            "coordenadas": [22.25935875, -97.84980481]
        },
        {
            "nombre": "ARTICULO 3 CONSTITUCIONAL",
            "clave": "28DPR2045M",
            "municipio": "65373913c1ab3bd66a190022",
            "coordenadas": [22.30321656, -97.84555324]
        },
        {
            "nombre": "PROFA. JUANA MARIA CABRERA SALINAS",
            "clave": "28DPR2334D",
            "municipio": "65373913c1ab3bd66a190022",
            "coordenadas": [22.29568885, -97.8216019]
        },
        {
            "nombre": "ENRIQUE C. REBSAMEN",
            "clave": "28DPR0085Z",
            "municipio": "65373914c1ab3bd66a190024",
            "coordenadas": [26.07253259, -98.30021881]
        },
        {
            "nombre": "FORD NUM. 16",
            "clave": "28DPR0754Z",
            "municipio": "65373914c1ab3bd66a190024",
            "coordenadas": [26.06222489, -98.28998255]
        },
        {
            "nombre": "PROF. FRANCISCO NICODEMO",
            "clave": "28DPR0770R",
            "municipio": "65373914c1ab3bd66a190024",
            "coordenadas": [26.06245877, -98.3129181]
        },
        {
            "nombre": "MIGUEL HIDALGO",
            "clave": "28DPR0774N",
            "municipio": "65373914c1ab3bd66a190024",
            "coordenadas": [26.090797, -98.27987153]
        },
        {
            "nombre": "ARTICULO 27 CONSTITUCIONAL",
            "clave": "28DPR0806P",
            "municipio": "65373914c1ab3bd66a190024",
            "coordenadas": [26.14604488, -98.34815524]
        },
        {
            "nombre": "FELIPE CARRILLO PUERTO",
            "clave": "28DPR1403C",
            "municipio": "65373914c1ab3bd66a190024",
            "coordenadas": [26.07051272, -98.32084586]
        },
        {
            "nombre": "EL CHAMIZAL",
            "clave": "28DPR1427M",
            "municipio": "65373914c1ab3bd66a190024",
            "coordenadas": [26.05310939, -98.37875574]
        },
        {
            "nombre": "GRAL. EMILIANO ZAPATA",
            "clave": "28DPR1433X",
            "municipio": "65373914c1ab3bd66a190024",
            "coordenadas": [26.0509989, -98.29787957]
        },
        {
            "nombre": "IGNACIO MANUEL 65373913c1ab3bd66a19001eNO",
            "clave": "28DPR1515G",
            "municipio": "65373914c1ab3bd66a190024",
            "coordenadas": [26.06872585, -98.34598395]
        },
        {
            "nombre": "HEROES DE LA INDEPENDENCIA DE MEXICO",
            "clave": "28DPR2047K",
            "municipio": "65373914c1ab3bd66a190024",
            "coordenadas": [26.05389537, -98.37802718]
        },
        {
            "nombre": "FELIPE ANGELES",
            "clave": "28DPR2081R",
            "municipio": "65373914c1ab3bd66a190024",
            "coordenadas": [26.01716916, -98.26412805]
        },
        {
            "nombre": "RAUL FLORES GARCIA",
            "clave": "28DPR2381O",
            "municipio": "65373914c1ab3bd66a190024",
            "coordenadas": [26.03747728, -98.35955164]
        },
        {
            "nombre": "MOCTEZUMA",
            "clave": "28DPR2452S",
            "municipio": "65373914c1ab3bd66a190024",
            "coordenadas": [26.006122, -98.246341]
        },
        {
            "nombre": "ARQUIMEDES CABALLERO CABALLERO",
            "clave": "28DPR2481N",
            "municipio": "65373914c1ab3bd66a190024",
            "coordenadas": [26.006122, -98.246341]
        },
        {
            "nombre": "JULIAN ERNESTO ZAMORA RIVAS",
            "clave": "28DPR2504H",
            "municipio": "65373914c1ab3bd66a190024",
            "coordenadas": [26.0060771051489, -98.24654573812798]
        }
    ]

    const guardar = [];
    for (let esc of escuelas) {
        const newEscuela = new escuelaModel();
        newEscuela.nombre = esc.nombre;
        newEscuela.clave = esc.clave;
        newEscuela.MUN = esc.municipio;
        newEscuela.coordenadas = esc.coordenadas;

        await newEscuela.save();
    }

}

module.exports = estanciarCtrl;