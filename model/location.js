const {sequelize, DataTypes, Model} = require("../db/sequelize")

class Location extends Model {};

// Defining db table as model in client
Location.init({
  city: DataTypes.STRING(28),
  point: DataTypes.GEOMETRY,
  last_access:DataTypes.DATE
},{
  sequelize,
  modelName:"Location",
  tableName:"location",
});

/**
  Creating one-to-one association 
  between location table and weather_detail table
 */
Location.belongsTo(
  sequelize.models.WeatherDetail, 
  { 
    onDelete:"CASCADE",
    foreignKey:{
      name: "weather_detail_id"
    }
  }
);
module.exports = Location;