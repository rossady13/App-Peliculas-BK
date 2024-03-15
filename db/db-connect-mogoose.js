const mongoose = require('mongoose');
const getConnection = async() => {

    try{

        const url = 'mongodb://rosa:Fh5qhEb1PB57Hi9i@ac-x9gxwwh-shard-00-00.gtlm6ew.mongodb.net:27017,ac-x9gxwwh-shard-00-01.gtlm6ew.mongodb.net:27017,ac-x9gxwwh-shard-00-02.gtlm6ew.mongodb.net:27017/inventarios?ssl=true&replicaSet=atlas-93or5k-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'

        await mongoose.connect(url);
        console.log('Conexion Exitosa');

    } catch(error){
        console.log(error);
    }
    
}
 module.exports = {
    getConnection,
 }