'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Language_Maid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Language_Maid.init({
    maid_id: DataTypes.INTEGER,
    language_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Language_Maid',
  });
  return Language_Maid;
};