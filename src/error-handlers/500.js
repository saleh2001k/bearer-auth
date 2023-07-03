
'use strict';

module.exports = (err, req, res, next) => {
  let errorMessage = err.message || err;
  res.statusCode = err.statusCode || 500;
  res.statusMessage = err.statusMessage || 'Server Error';
  res.setHeader('Content-Type', 'text/plain');
  res.write(errorMessage);
  res.end();
};