'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next({ statusCode: 403, message: 'Invalid Login' });
  }

  const bearer = req.headers.authorization;
  const token = bearer.split(' ')[1];

  try {
    const decodedCredentials = base64.decode(token);
    const [username, password] = decodedCredentials.split(':');

    const user = await users.authenticateBasic(username, password);

    if (!user) {
      return next({ statusCode: 403, message: 'Invalid Login' });
    }

    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    next({ statusCode: 403, message: 'Invalid Login' });
  }
};
