const moongose = require('mongoose');

const dbConnection = async () => {

    try{

        await moongose.connect( process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        } );

        console.log('Base de datos online');

    }catch(error){
        console.log(error);
        throw new Error('Error a la hora de conectar a la BD');
    }

}

module.exports = {
    dbConnection
}