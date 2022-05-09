"use strict";

const { Location, WeatherDetail, Temperature, Wind  } = 
require("../db/sequelize").sequelize.models;
const infoTemplate = require("./infoTemplate");
const { asyncMethod, asyncWrapper } = require("../factory/asyncWrapper")

class UpdateRecords {
  next;
  #cityInfo;
  #weatherInfo;

  constructor( next, cityInfo, weatherInfo) {
    this.next = next;
    this.#cityInfo = cityInfo;
    this.#weatherInfo = weatherInfo;
  };

  // returns updated weather info 
  update = asyncWrapper(async() =>{
    const [locationInstance ,] = await Promise.all([
      Location.findByPk(this.#cityInfo.id),

      Location.update(
        {last_access:Date.now()},
        {where:{ id: this.#cityInfo.id}}
      )
    ]);

    // start updating children entities
    await this.#updateChildren(locationInstance);

    return this.#getWeatherInfoTemplate();
  });

  #updateChildren = 
    asyncWrapper(async (locationInstance) => {
    // weather_detail table
    const main = this.#getWeatherInfoTemplate();
    const weatherData = {
      description: main.description,
      pressure:main.pressure,
      humidity:main.humidity,
      visibility:main.visibility
    }

    const {id, wind_id, temperature_id} = await locationInstance.getWeatherDetail(); 
    const { Temperature:tempData, Wind:windData } = this.#getWeatherInfoTemplate();

    await Promise.all([
      Wind.update(windData, { where:{ id : wind_id}}),
      WeatherDetail.update(weatherData, { where:{ id } }),
      Temperature.update(tempData, { where:{ id : temperature_id}}),
    ]);
  });

  #getWeatherInfoTemplate() {
    return infoTemplate(this.#weatherInfo)
  }
};

module.exports = UpdateRecords;