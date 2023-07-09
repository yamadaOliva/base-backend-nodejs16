'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_profile.belongsTo(models.User,{foreignKey: 'UserID'})
    }
  }
  User_profile.init({
    UserID: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.STRING,
    avatar_url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User_profile',
  });
  return User_profile;
};