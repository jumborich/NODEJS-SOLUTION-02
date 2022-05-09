const {sequelize, DataTypes, Model} = require("../db/sequelize")

class Temperature extends Model {};

// Defining db table as model in client
Temperature.init({
	temp: DataTypes.DECIMAL(5, 2),
	feels_like: DataTypes.DECIMAL(5, 2),
	temp_min: DataTypes.DECIMAL(5, 2),
	temp_max: DataTypes.DECIMAL(5, 2),
},{
  sequelize,
  modelName:"Temperature",
  tableName:"temperature"
});

module.exports = Temperature;