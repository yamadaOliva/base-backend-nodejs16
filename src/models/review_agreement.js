'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review_agreement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review_agreement.belongsTo(models.Review, {foreignKey: 'review_id'})
    }
  }
  Review_agreement.init({
    review_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    agreement: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Review_agreement',
  });
  return Review_agreement;
};