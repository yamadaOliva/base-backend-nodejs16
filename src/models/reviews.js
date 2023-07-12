'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User);
      Review.hasMany(models.Review_agreement, {foreignKey: 'review_id'});
    }
  }
  Review.init({
    UserId: DataTypes.INTEGER,
    maid_id: DataTypes.INTEGER,
    review: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};