// Returns formatted weather information given a weatherData Object
module.exports = ({ main,wind, weather, visibility}) => {
  return {
    description: weather[0]?.description,
    pressure:main.pressure,
    humidity:main.humidity,
    visibility,
    Wind:wind,
    Temperature: {
      temp:main.temp,
      feels_like:main.feels_like,
      temp_min:main.temp_min,
      temp_max:main.temp_max
    }
  }
};