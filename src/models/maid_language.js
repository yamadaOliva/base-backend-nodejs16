'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Maid_language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Maid_language.init({
    MaidProfileID: DataTypes.INTEGER,
    LanguageID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Maid_language',
  });
  return Maid_language;
};