"use strict";
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: DataTypes.STRING,
      firstname: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      isAgent: DataTypes.BOOLEAN,
      lastname: DataTypes.STRING,
      phoneNumber: DataTypes.STRING
    },
    {}
  );
  User.associate = models => {
    // User.hasMany(models.Property, {
    //   foreignKey: id
    // });
  };
  return User
};
