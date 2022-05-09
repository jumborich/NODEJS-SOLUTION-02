// Hooks db up with sequelize and exports needed objects
const dbConfig = require("config").get("db");
const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports.Sequelize = Sequelize;
module.exports.DataTypes = DataTypes;
module.exports.Model = Model;

module.exports.sequelize = new Sequelize(
  dbConfig.name, 
  dbConfig.username, 
  dbConfig.password, 
  {
  host: dbConfig.host,
  dialect:dbConfig.dialect,
  define:{
    timestamps:false
  }
});