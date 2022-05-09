const {sequelize, DataTypes, Model} = require("../db/sequelize")

class Wind extends Model {};

// Defining db table as model in client
Wind.init({
	speed: DataTypes.DECIMAL(5, 2),
	deg: DataTypes.INTEGER,
	gust:DataTypes.DECIMAL(5, 2),
},{
  sequelize,
  modelName:"Wind",
  tableName:"wind"
});

module.exports = Wind;