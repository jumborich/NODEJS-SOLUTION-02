"use strict";
const AppError = require("./../utils/appError");
const weatherUtils = require("./../utils/weather");
const { sequelize } = require("../db/sequelize")
const { Location } = sequelize.models;
const { asyncWrapper, asyncMiddleWare } = require("../factory/asyncWrapper");

const DBRecordCreator = require("../utils/recordCreator");
const GetWeatherInfoIntegrity = require("../utils/infoIntegrity");
// const fixtures = require("../tests/fixtures");

module.exports.getWeatherDetails = 
 asyncMiddleWare(async (req, res, next) => {
    const city = req.query?.city;
    const country = req.query?.country;

    if(!city) 
      return next(new AppError( "city is required for weather info.", 400));

    const weatherInfo = await exports.createOrUpdateWeatherInfo(city, country, next);

    res.status(200).json({ message:"success", data:{ weatherInfo }});
 });

// returns weather info
module.exports.createOrUpdateWeatherInfo = 
  asyncWrapper(async(city, country, next) => {  
    const coordinates  = await weatherUtils.getCoordinates({ city, country }, next);

    // 1. Check db for existence of weather info for given city
    let locationData = 
    await Location.findAll({ 
      where: { city }, 
      attributes: {include:"id", exclude: "weather_detail_id"}
    });

    if(locationData.length){
      let exactCityInfo = exports.getExactCityInfo(locationData, coordinates);
      return await new GetWeatherInfoIntegrity(exactCityInfo, next).getInfo(); //checks time diff since last acces 
    }

      const weatherResponse = await weatherUtils.getWeatherData(coordinates, next);
      const dbRecordCreator = new DBRecordCreator(weatherResponse, next);
      return await dbRecordCreator.createLocationRecord(city, coordinates);
  });

//where more than one city have the same name, find by coordinates
module.exports.getExactCityInfo = 
  (locationData, coordinates) => 
    locationData.find(data =>{
      const [lon, lat] = data.point.coordinates;
      return (lon === coordinates.lon && lat === coordinates.lat)
    });