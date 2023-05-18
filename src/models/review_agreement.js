'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agreement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Agreement.init({
    review_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    agreement: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Agreement',
  });
  return Agreement;
};