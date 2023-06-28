'use strict';

const { User } = require('../models/index.js');

async function handleSignup(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new Error('Username and password are required.');
    }

    let userRecord = await User.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    if (!req.user) {
      return next(e);
    }

    const user = {
      user: req.user,
      token: req.user.token
    };
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await User.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send("Welcome to the secret area!");
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret
};
