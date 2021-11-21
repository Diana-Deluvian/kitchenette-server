const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL
, {
  useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once("open", function() {
    console.log("Connection with MongoDB was successful");
});

module.exports = connection;
