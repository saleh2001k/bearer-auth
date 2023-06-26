'use strict';

// Start up DB Server
const { db } = require('./src/auth/models/index.js');
db.sync()
  .then(() => {

    require('./src/server.js').start(process.env.PORT);
  });

// "use strict";

// require("dotenv").config();
// const { start } = require("./src/server");
// const { db } = require("./src/auth/models/index");

// const PORT = process.env.PORT || 5000;

// db.sync()
//   .then(() => {
//     start(PORT);
//   })
//   .catch((err) => console.log(err));