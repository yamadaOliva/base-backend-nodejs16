'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Maid_profile, {foreignKey: 'maid_id'})
      Booking.belongsTo(models.User, {foreignKey: 'user_id'})
    }
  }
  Booking.init({
    booking_id: DataTypes.INTEGER,
    maid_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    price: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    cancel_reason: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};