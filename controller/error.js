
const winston = require('winston');

module.exports = (err, req, res, next) => {
  
  winston.error(err.message, err); // Log errors

  const status = err.statusCode || 500;

  // set as default message
  if(status === 500 || !err.message)
    err.message = "Server error"
  
  res.status(status).send(err.message);
}