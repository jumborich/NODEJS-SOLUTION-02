const router = require("express").Router();
const weatherController = require("./../controller/weather");

router.get("/", weatherController.getWeatherDetails);

module.exports = router;