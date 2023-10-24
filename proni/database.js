// import de modulo mongoose
const mongoose = require('mongoose');

// Uri de conexion a base de datos.
// establece el usuario: isaulbelmont y pass: SNRZjm170Wl9J7wq

// const URI = "mongodb+srv://isaulbelmont:<password>@maps.rscx5qh.mongodb.net/
const URI = "mongodb+srv://isaulbelmont:SNRZjm170Wl9J7wq@maps.rscx5qh.mongodb.net/proni" // prod

// realiza la conexion segun la uri indicada
// si conecta, indica mensaje de  "Mongo conectado", caso contrario indica el error
mongoose.connect(URI)
    .then(db => console.log('Mongo conectado'))
    .catch(err => console.error(err));

// exporta el modulo para su uso
module.exports = mongoose;