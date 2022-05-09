const apiKeys = require("config").get("apiKeys");
const axios = require("axios").default;
const lookup = require('country-code-lookup');
const { asyncWrapper } = require("../factory/asyncWrapper");

const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q={location}&appid=${apiKeys.openWeatherMap}`;
const weatherDataUrl = `https://api.openweathermap.org/data/2.5/weather?{latlon}&units=metric&appid=${apiKeys.openWeatherMap}`

exports.getCoordinates = 
  asyncWrapper(async ({city, country }) => {
    let countryCode = "CA" // default

    if(country){
      // Capitalizing country as needed by lookup library
      country = country[0].toUpperCase() + country.substring(1).toLowerCase();
      countryCode = lookup.byCountry(country).internet;
    }

    const url = geocodeUrl.replace("{location}", `${city},${countryCode}`);

    // returning first and most accurate location
    const response  = await axios.get(url);
    return {lon: response.data[0].lon, lat: response.data[0].lat};
  });

exports.getWeatherData = asyncWrapper(async ({ lat, lon }) => {
  const url = weatherDataUrl.replace("{latlon}", `lat=${lat}&lon=${lon}`);

  const response = await axios.get(url);
  return response.data;
});