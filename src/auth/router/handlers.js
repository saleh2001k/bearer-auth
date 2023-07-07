'use strict';

const { users } = require('../models/index.js');

async function handleSignup(req, res, next) {
  try {
    const { username: reqUsername, password } = req.body;

    if (!reqUsername || !password) {
      throw new Error('Username and password are required.');
    }

    let userRecord = await users.create(req.body);
    const { token, id, username } = userRecord;
    const output = {
      user: { token, id, username },
      token
    };
    res.status(201).json(output);
  } catch (error) {
    console.error('Error in handleSignup:', error);
    next(error);
  }
}


async function handleSignin(req, res, next) {
  try {
    if (!req.user) {
      throw new Error('Invalid user.');
    }

    const { token, id, username } = req.user;
    const user = {
      user: { token, id, username },
      token
    };
    res.status(200).json(user);
  } catch (error) {
    console.error('Error in handleSignin:', error);
    next(error);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await users.findAll({});
    const list = userRecords.map(userRecord => userRecord.username);
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
