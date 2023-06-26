const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next({ statusCode: 403, message: 'Invalid Login' });
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateWithToken(token);

    req.user = validUser;
    req.token = validUser.token;

    next();
  } catch (e) {
    console.error(e);
    next({ statusCode: 403, message: 'Invalid Login' });
  }
};
