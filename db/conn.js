const {Sequelize} = require('sequelize');
const sequelize = new Sequelize ('toughts2', 'root', 'password',{
    host: 'localhost',
    dialect: 'mysql',
})

try{
    sequelize.authenticate();
    console.log('Conectado com sucesso!');
} catch(err){
    console.log(`Não foi possível conectar: ', ${err} `);
}

module.exports = sequelize;