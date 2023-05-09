'use strict';
const moment = require('moment')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Animal.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id'
      });
      Animal.hasMany(models.Comment, {
        as: 'comments',
        foreignKey: 'animal_id'
      })
    }
  }
  Animal.init({
    color: DataTypes.STRING,
    type: DataTypes.STRING,
    age: DataTypes.STRING,
    image_url: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    backstory: DataTypes.STRING,
    name: DataTypes.STRING,
    created_on: DataTypes.DATE,
    friendlyCreatedDate: {
      type: DataTypes.VIRTUAL,
      get(){
        return moment(this.created_on).format('MMMM Do, YYYY')
      }
    }
  }, {
    sequelize,
    modelName: 'Animal',
    timestamps: false,
    tableName: 'swooshy_animals'
  });
  return Animal;
};