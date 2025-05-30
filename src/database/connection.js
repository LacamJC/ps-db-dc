require("dotenv").config()

const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DRIVE,
    port: process.env.DB_PORT
})

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados foi bem sucedida!');
        console.log(`Driver: ${ process.env.DB_DRIVE}`)
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
}

connect()

module.exports = sequelize
