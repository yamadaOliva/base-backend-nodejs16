'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Maid_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Maid_profile.init({
    maid_id: DataTypes.INTEGER,
    frist_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.STRING,
    exprience: DataTypes.STRING,
    skills: DataTypes.STRING,
    certifications: DataTypes.STRING,
    price_per_hour: DataTypes.INTEGER,
    avatar_url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Maid_profile',
  });
  return Maid_profile;
};