const Sequelize = require('sequelize');
const sequelize = new Sequelize('formulario', 'root', 'ph97233313', {
    host: "localhost",
    dialect: 'mysql'
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
