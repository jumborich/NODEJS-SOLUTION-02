const {sequelize, DataTypes, Model} = require("../db/sequelize")

class WeatherDetail extends Model {};

// Defining db table as model in client
WeatherDetail.init({
	description: DataTypes.STRING(128),
	pressure:DataTypes.INTEGER,
	humidity:DataTypes.INTEGER,
	visibility:DataTypes.INTEGER,
},{
  sequelize,
  modelName:"WeatherDetail",
  tableName:"weather_detail"
});

// Creating one-to-on assoc between wind table and weather_detail table
WeatherDetail.belongsTo(
    sequelize.models.Wind, 
    {
      onDelete:"CASCADE",
      foreignKey:{
        name:"wind_id"
      }
    }
);

// Creating one-to-on assoc between temp table and weather_detail table
WeatherDetail.belongsTo(
    sequelize.models.Temperature, 
  {
    onDelete:"CASCADE",
    foreignKey:{
      name:"temperature_id"
    }
  }
);

module.exports = WeatherDetail;