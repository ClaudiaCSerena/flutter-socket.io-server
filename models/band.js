const { v4: uuidV4 } = require('uuid'); //v4 es el alias. uuidV4 significa versión 4

class Band {
    constructor( name = 'no-name') {
        this.id = uuidV4(); //identificador único
        this.name = name;
        this.votes = 0;
    }
}

//Para exportar la clase:
module.exports = Band;
