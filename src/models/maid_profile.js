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
     Maid_profile.belongsTo(models.User)
      Maid_profile.belongsToMany(models.Language,{through: 'Maid_language'});
    }
  }
  Maid_profile.init({
    UserId: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    skills: DataTypes.STRING,
    ceftification: DataTypes.STRING,
    price_per_hour: DataTypes.INTEGER,
    avatar_url: DataTypes.STRING,
    rating: DataTypes.DECIMAL(10,1),
  }, {
    sequelize,
    modelName: 'Maid_profile',
  });
  return Maid_profile;
};