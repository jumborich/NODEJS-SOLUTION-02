require("dotenv").config;
const config = require("config");
const express = require("express");
const winston = require("winston")

require("./logger") // winston logger

// Syncing database
require("./db").then().catch(e => winston.error(e.message, e));

const weatherRoute = require("./routes/weather");
const errorHandler = require("./controller/error");

const app = express();

app.use(express.json());

// Routes
app.use("/tcs/api/v1/weather", weatherRoute);

// Err handler
app.use(errorHandler);

// server connection
const port = config.get("server.port");
app.listen(port);

