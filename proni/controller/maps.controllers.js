const mapsCtrl = {};

mapsCtrl.home = async (req, res) => {
    res.render('mapa_tamaulipas.ejs');
}

module.exports = mapsCtrl;