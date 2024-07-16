const Band = require("./band");

class Bands {

    //Constructor:
    constructor() {
        this.bands = [];
    }

    //Para agregar una banda:
    addBand (band = new Band()) {
        this.bands.push(band);
    }

    //Para obtener el listado de las bandas:
    getBands (){
        return this.bands;
    }

    //Para eliminar una banda de la lista
    deleteBand ( id = '') {
        this.bands = this.bands.filter(band => band.id !== id);
        return this.bands;
    }

    //Para votar por una banda
    voteBand ( id = '' ) {
        this.bands = this.bands.map( band => {
            if (band.id === id) {
                band.votes++;
                return band;
            } else {
                return band;
            }
        })

    }
}

module.exports = Bands;