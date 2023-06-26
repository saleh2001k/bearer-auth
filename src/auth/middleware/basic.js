const base64 = require('base-64');
const { user } = require('../models/index.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next({ statusCode: 403, message: 'Invalid Login' });
  }

  const basic = req.headers.authorization;
  const [username, pass] = base64.decode(basic).split(':');

  try {
    req.user = await user.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.error(e);
    next({ statusCode: 403, message: 'Invalid Login' });
  }
};
