const AppError = require('../utils/appError');;
const winston = require("winston");

//Wraps all async middlewares
module.exports.asyncMiddleWare = (middleware) =>
  async(req,res, next) => {
    try {
      await middleware(req, res, next);
    } 
    catch (error) {
      winston.error(error.message, error)
      next(new AppError(error));
    }
  };
  

/**
 * Wraps all async functions
 * NOTE: next must come as last param if in func or from this if in a class
 */
module.exports.asyncWrapper = (asyncFn) => 
  async function(...args){
    try {
      return await asyncFn(...args);
    } 
    catch (error) {
      winston.error(error.message, error)
      const next = this.next ? this.next : args[args.length - 1] // in this or last item passed to fn
      next(new AppError(error));
    }
  };