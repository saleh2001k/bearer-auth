'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, process.env.SECRET);
      }
    }
  });

  User.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  // Basic AUTH: Validating strings (username, password)
  User.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    if (!user) {
      throw { statusCode: 403, message: 'Invalid User' };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }

    throw { statusCode: 403, message: 'Wrong password' };
  };

  // Bearer AUTH: Validating a token
  User.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      const user = await this.findOne({ where: { username: parsedToken.username } });
      if (!user) {
        throw { statusCode: 403, message: 'User Not Found' };
      }
      return user;
    } catch (e) {
      throw { statusCode: 403, message: e.message };
    }
  };

  return User;
};

module.exports = {
  userSchema: userSchema,
};
