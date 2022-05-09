/**
 * This module syncs db and exports a promise;
 */

require("./../model");  // imported to enable models sync automatically on app start
const { sequelize } = require("./sequelize");

module.exports = sequelize.sync();
