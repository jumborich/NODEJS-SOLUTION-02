"use strict";

const AppError = require("./appError");
const weatherUtils = require("./weather");
const DBRecordCreator = require("./recordCreator");
const UpdateRecords = require("./recordUpdater")
const { asyncMethod, asyncWrapper } = require("../factory/asyncWrapper")
// const { weatherResponse } = require("../tests/fixtures")
const { Location } = require("../db/sequelize").sequelize.models;

/**
 * Checks if weather info data in db is stale and fetches new/updates db info
 */


class GetWeatherInfoIntegrity {
  #cityInfo;

  constructor(exactCityInfo, next){
    this.next = next;
    this.#cityInfo = exactCityInfo;
  };
  
  // Checks if weather data in db is stale and fetches new 
  getInfo = asyncWrapper(async () => {
    const { id, city, point } = this.#cityInfo;
    if(this.#getTimeDifference() < 20){
      const locationInfo = await this.#getLocationInfoDB(id, this.next);
      return locationInfo.toJSON().WeatherDetail;
    }
    else{
      const coordinates = { lon: point.coordinates[0], lat: point.coordinates[1]}
      const weatherResponse = await weatherUtils.getWeatherData(coordinates);
        // Start updating weather Info records
      return await new UpdateRecords(
        this.next, this.#cityInfo, weatherResponse
      )
    .update();
    }
  });

  #getLocationInfoDB = asyncWrapper(async() =>{
  const exclude = [
    "id", "point",
    "wind_id", "last_access",
    "temperature_id", 
    "weather_detail_id"
  ];

  return await Location.findByPk(
    this.#cityInfo.id,
    {
      include:{ all:true, nested:true, attributes:{ exclude } },
      attributes:{ exclude },
    }
  );
 });

  // returns diff in seconds
  #getTimeDifference(){
    return (Date.now() - this.#cityInfo.last_access) / 1000;
  };
};

module.exports = GetWeatherInfoIntegrity;