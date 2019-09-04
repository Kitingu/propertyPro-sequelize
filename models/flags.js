'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flags = sequelize.define('Flags', {
    owner: DataTypes.STRING,
    propertyId: DataTypes.STRING,
    reason: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Flags.associate = function(models) {
    // associations can be defined here
  };
  return Flags;
};