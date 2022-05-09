const fixtures = require("./../../fixtures");
const weatherController = require("../../../controller/weather");

describe("weatherController", () => {

  //getExactCityInfo
  it("should return the city matching the provided geocoordinates",
   () => {
     const locationData = [
       {city: "Toronto", point:{coordinates:[1, 2] }},
       {city: "Alberta", point:{coordinates:[3, 4] }}
     ]
    
     const coordinates = { lon: 1, lat: 2};

     const res = weatherController.getExactCityInfo(locationData, coordinates);

     //assert
     expect(res).toMatchObject({city: "Toronto" });
  });


  //createOrUpdateWeatherInfo
  it("should create or update WeatherInfo")
});
