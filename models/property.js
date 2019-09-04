'use strict';
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    status: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    owner: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.STRING,
    address: DataTypes.STRING,
    ownerPhoneNumber: DataTypes.STRING,
    image_url: DataTypes.STRING
  }, {});
  Property.associate = function(models) {
    // associations can be defined here
  };
  return Property;
};