'use strict';
const { DataTypes } = require('sequelize');
const db = require('../config/db');


  const User = db.define('User', {
    
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {    
  });

module.exports = User;






