"use strict";
const infoTemplate = require("./infoTemplate");
const { asyncMethod, asyncWrapper } = require("../factory/asyncWrapper")
const { Location } = require("../db/sequelize").sequelize.models;

/**
 * Will create all db records for core weather data 
 */
class DBRecordCreator{
  #weatherData;

  constructor(weatherData, next){
    this.next = next;
    this.#weatherData = weatherData;
  };

  createLocationRecord = 
    asyncWrapper(async (city, coordinates) => {
    const locationData = {
      city,
      point:{
        type:"Point",
        coordinates:[
          coordinates.lon,
          coordinates.lat
        ]
      },
      last_access: Date.now()
    }

    // 1. create location record
    const locationInstance = await Location.create(locationData);

    // 2. create weather details record using association
    await this.#createChildRecords(locationInstance)
    
    // Return weather info/data object
    return this.#getWeatherInfoTemplate();
  });

  #createChildRecords = 
    asyncWrapper( async (locationInstance) => {
    const main = this.#getWeatherInfoTemplate();
    const weatherData = {
      description: main.description,
      pressure:main.pressure,
      humidity:main.humidity,
      visibility:main.visibility,
    }

    const weatherInstance = await (locationInstance
      .createWeatherDetail(weatherData));

    // Create wind and temperature records simultaneously
    const { Wind, Temperature } = this.#getWeatherInfoTemplate();
      await Promise.all([
        weatherInstance.createWind(Wind),
        weatherInstance.createTemperature(Temperature)
      ]);
  });

  #getWeatherInfoTemplate() {
    return infoTemplate(this.#weatherData)
  }
}

module.exports = DBRecordCreator;