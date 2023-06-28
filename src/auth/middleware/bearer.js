const base64 = require('base-64');
const { User } = require('../models/index.js');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return next({ statusCode: 403, message: 'Invalid Login' });
    }

    const token = authorization.split(' ')[1];
    const decodedToken = base64.decode(token);

    req.user = await User.authenticateToken(decodedToken);
    next();
  } catch (error) {
    console.error(error);
    next({ statusCode: 403, message: 'Invalid Login' });
  }
};



// const base64 = require("base-64");
// const Users  = require("../models/index.js");

// module.exports = (req, res, next) => {
//   if (req.headers.authorization) {
//     const token = req.headers.authorization.split(" ").pop();
//     Users.bearerChecker(token)
//       .then((data) => {
//         req.user = data;
//         next();
//       })
//       .catch((err) => next(err));
//   }
// };
