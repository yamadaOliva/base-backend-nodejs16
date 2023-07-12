'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Report.init({
    user_id: DataTypes.INTEGER,
    report_id: DataTypes.INTEGER,
    reason: DataTypes.STRING,
    is_handled: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};