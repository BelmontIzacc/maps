const reporteCtrl = {};

// import de exceptions
const StandarException = require('../exception/StandarException');
const codigos = require('../exception/codigos');

// path de recursos (claves, mapas)
const csvURL = 'https://raw.githubusercontent.com/BelmontIzacc/maps_datos/master/';

// import de xls
const XLSX = require('xlsx');

// import para manejo de archivos
const csv = require('csvtojson');

// import para peticion http
const axios = require('axios');

reporteCtrl.crearXls = async (tipo = 0) => {
  const csvEscuela = csvURL + 'Informacion_general/escuelas.csv';
  const csvMun = csvURL + 'Informacion_general/municipios.csv';
  const csvZona = csvURL + 'Informacion_general/zonas.csv';

  const escuela = await recuperarDatosGeneralesEscuela(csvEscuela);
  const municipio = await recuperarDatosGeneral(csvMun);
  const zona = await recuperarDatosGeneral(csvZona);

  const workbook = XLSX.utils.book_new();
  let customSheet;

  if (tipo === 1) {
    customSheet = hojaEscuelas(escuela);
  } else if (tipo === 2) {
    customSheet = hojaMunicipio(municipio);
  } else if (tipo === 3) {
    customSheet = hojaZona(zona);
  }

  XLSX.utils.book_append_sheet(workbook, customSheet, 'Hoja Personalizada');
  // const excelFileName = 'mi_archivo.xls';
  // XLSX.writeFile(workbook, excelFileName);

  const excelData = XLSX.write(workbook, { bookType: 'xls', bookSST: false, type: 'base64' });
  return excelData;
  // const dataUri = `data:application/vnd.ms-excel;base64,${excelData}`;
  // return dataUri;
}

hojaEscuelas = (data) => {
  const sheetData = [];
  for (let i = 0; i < data.length; i++) {
    sheetData.push(['CCT: ' + data[i].CCT, 'Nombre: ' + data[i].school_name, 'Municipio: ' + data[i].municipio, 'Zona: ' + data[i].zona, '']);
    sheetData.push(['Numero de grupos: ', '' + data[i].group_number, 'Mejor grupo: ', '' + data[i].best_group, '']);
    sheetData.push(['Total de estudiantes: ', '' + data[i].numAlumnos, 'Estudiantes evaluados: ', '' + data[i].students_number, '']);
    sheetData.push(['Listening', 'Reading/Writing', 'Speaking part 1', 'Speaking part 2', 'Desempeño general']);
    sheetData.push(['' + data[i].qualification_listening, '' + data[i].qualification_reading, '' + data[i].qualification_speaking_part_1, '' + data[i].qualification_speaking_part_2, '' + data[i].percentage_correct + ' / 100']);
    sheetData.push(['Rendimiento', '', '', '', '']);
    sheetData.push(['Mejor: ', '' + data[i].best_section, 'Menor: ', '' + data[i].worst_section, '']);
    sheetData.push(['Preguntas', '', '', '', '']);
    sheetData.push(['Mejor: ', '' + data[i].best_question, 'Menor: ', '' + data[i].worst_question, '']);
    sheetData.push(['Niñas', '' + data[i].girl, 'Niños', '' + data[i].boy, '']);
    sheetData.push(['Edades', '', '', '', '']);
    sheetData.push(['Alumnos de 10', 'Alumnos de 11', 'Alumnos de 12', 'Alumnos de 13', '']);
    sheetData.push(['' + data[i].age_10, '' + data[i].age_11, '' + data[i].age_12, '' + data[i].age_13, '']);
    sheetData.push(['', '', '', '', '']);
  }

  const sheet = XLSX.utils.aoa_to_sheet(sheetData);
  sheet['!cols'] = fitToColumn(sheetData);
  function fitToColumn(arrayOfArray) {
    return arrayOfArray[0].map((a, i) => ({ wch: Math.max(...arrayOfArray.map(a2 => a2[i] ? a2[i].toString().length : 0)) }));
  }

  return sheet;
}

hojaMunicipio = (data) => {
  const sheetData = [];
  for (let i = 0; i < data.length; i++) {
    sheetData.push(['Nombre: ' + data[i].municipality, 'Zona: ' + data[i].zone, 'Numero de escuelas: ' + data[i].schools_number]);
    sheetData.push(['Total de estudiantes: ', '' + data[i].numAlumnos, 'Estudiantes evaluados: ', '' + data[i].students_number, '']);
    sheetData.push(['Listening', 'Reading/Writing', 'Speaking part 1', 'Speaking part 2', 'Desempeño general']);
    sheetData.push(['' + data[i].qualification_listening, '' + data[i].qualification_reading, '' + data[i].qualification_speaking_part_1, '' + data[i].qualification_speaking_part_2, '' + data[i].percentage_correct + ' / 100']);
    sheetData.push(['Escuelas', '', '', '', '']);
    sheetData.push(['Mejor: ', '' + data[i].best_school, 'Menor: ', '' + data[i].worst_school, '']);
    sheetData.push(['Rendimiento', '', '', '', '']);
    sheetData.push(['Mejor: ', '' + data[i].best_section, 'Menor: ', '' + data[i].worst_section, '']);
    sheetData.push(['Preguntas', '', '', '', '']);
    sheetData.push(['Mejor: ', '' + data[i].best_question, 'Menor: ', '' + data[i].worst_question, '']);
    sheetData.push(['Niñas', '' + data[i].girl, 'Niños', '' + data[i].boy, '']);
    sheetData.push(['Edades', '', '', '', '']);
    sheetData.push(['Alumnos de 10', 'Alumnos de 11', 'Alumnos de 12', 'Alumnos de 13', '']);
    sheetData.push(['' + data[i].age_10, '' + data[i].age_11, '' + data[i].age_12, '' + data[i].age_13, '']);
    sheetData.push(['', '', '', '', '']);
  }

  const sheet = XLSX.utils.aoa_to_sheet(sheetData);
  sheet['!cols'] = fitToColumn(sheetData);
  function fitToColumn(arrayOfArray) {
    return arrayOfArray[0].map((a, i) => ({ wch: Math.max(...arrayOfArray.map(a2 => a2[i] ? a2[i].toString().length : 0)) }));
  }

  return sheet;
}

hojaZona = (data) => {
  const sheetData = [];
  for (let i = 0; i < data.length; i++) {
    sheetData.push(['Zona: ' + data[i].zone, 'Numero de escuelas: ' + data[i].schools_number, 'Numero de municipios: ' + data[i].municipalities_number, 'Numero de escuelas: ' + data[i].schools_number]);
    sheetData.push(['Total de estudiantes: ', '' + data[i].numAlumnos, 'Estudiantes evaluados: ', '' + data[i].students_number, '']);
    sheetData.push(['Listening', 'Reading/Writing', 'Speaking part 1', 'Speaking part 2', 'Desempeño general']);
    sheetData.push(['' + data[i].qualification_listening, '' + data[i].qualification_reading, '' + data[i].qualification_speaking_part_1, '' + data[i].qualification_speaking_part_2, '' + data[i].percentage_correct + ' / 100']);
    sheetData.push(['Escuelas', '', '', '', '']);
    sheetData.push(['Mejor: ', '' + data[i].best_school, 'Menor: ', '' + data[i].worst_school, '']);
    sheetData.push(['Rendimiento', '', '', '', '']);
    sheetData.push(['Mejor: ', '' + data[i].best_section, 'Menor: ', '' + data[i].worst_section, '']);
    sheetData.push(['Preguntas', '', '', '', '']);
    sheetData.push(['Mejor: ', '' + data[i].best_question, 'Menor: ', '' + data[i].worst_question, '']);
    sheetData.push(['Niñas', '' + data[i].girl, 'Niños', '' + data[i].boy, '']);
    sheetData.push(['Edades', '', '', '', '']);
    sheetData.push(['Alumnos de 10', 'Alumnos de 11', 'Alumnos de 12', 'Alumnos de 13', '']);
    sheetData.push(['' + data[i].age_10, '' + data[i].age_11, '' + data[i].age_12, '' + data[i].age_13, '']);
    sheetData.push(['', '', '', '', '']);
  }

  const sheet = XLSX.utils.aoa_to_sheet(sheetData);
  sheet['!cols'] = fitToColumn(sheetData);
  function fitToColumn(arrayOfArray) {
    return arrayOfArray[0].map((a, i) => ({ wch: Math.max(...arrayOfArray.map(a2 => a2[i] ? a2[i].toString().length : 0)) }));
  }

  return sheet;
}

recuperarDatosGeneralesEscuela = async (csvUrl) => {
  let response = await axios.get(csvUrl);
  const datosGenerales = [];
  if (response.status === 200) {
    const jsonData = await csv().fromString(response.data);
    for (let data of jsonData) {
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
          percentage_correct: data.percentage_correct,
          speaking_A_evaluation: data.speaking_A_evaluation,
          speaking_B_evaluation: data.speaking_B_evaluation,
          speaking_evaluation: data.speaking_evaluation,
          group_number: data.group_number,
          best_group: data.best_group,
          best_percentage: data.best_percentage,
          school_name: data.school_name,
          age_10: data.age_10,
          age_11: data.age_11,
          age_12: data.age_12,
          age_13: data.age_13,
          percentage_correct: data.percentage_correct,
          numAlumnos: data.numAlumnos,
          municipio: data.municipio,
          zona: data.zona,
          best_question: data.best_question,
          worst_question: data.worst_question,
          CCT: data.CCT
        }
      );
    }
    return datosGenerales;
  }
  return datosGenerales;
}

recuperarDatosGeneral = async (csvUrl) => {
  let response = await axios.get(csvUrl);
  const datosGenerales = [];
  if (response.status === 200) {
    const jsonData = await csv().fromString(response.data);
    for (let data of jsonData) {
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
          percentage_correct: data.percentage_correct,
          speaking_A_evaluation: data.speaking_A_evaluation,
          speaking_B_evaluation: data.speaking_B_evaluation,
          speaking_evaluation: data.speaking_evaluation,
          group_number: data.group_number,
          best_group: data.best_group,
          best_percentage: data.best_percentage,
          school_name: data.school_name,
          age_10: data.age_10,
          age_11: data.age_11,
          age_12: data.age_12,
          age_13: data.age_13,
          percentage_correct: data.percentage_correct,
          numAlumnos: data.numAlumnos,
          municipality: data.municipality,
          zone: data.zone,
          best_question: data.best_question,
          worst_question: data.worst_question,
          best_school: data.best_school,
          worst_school: data.worst_school,
          schools_number: data.schools_number,
          municipalities_number: data.municipalities_number
        }
      );
    }
    return datosGenerales;
  }
  return datosGenerales;
}

module.exports = reporteCtrl;