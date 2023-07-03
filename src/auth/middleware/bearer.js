const { users } = require('../models/index.js');

const authenticateUser = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('Invalid Login');
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);

    if (!validUser) {
      throw new Error('Invalid Login');
    }

    req.users = validUser;
    req.token = validUser.token;

    next();
  } catch (error) {
    console.error(error);
    res.status(403).send('Invalid Login');
  }
};

module.exports = authenticateUser;