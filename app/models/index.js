const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.CONNECTION_STRING);

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.my_table = require("./my_table.model.js")(sequelize, Sequelize);

module.exports = db;