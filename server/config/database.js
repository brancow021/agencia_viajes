const Sequelize = require('sequelize').Sequelize;
require('dotenv').config({path: 'variables.env'})

// console.log(process.env.BD_NOMBRE)

module.exports = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER , process.env.BD_PASS , {
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})