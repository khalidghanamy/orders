const mongoose = require("mongoose");
const connectDb = (url, server) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected"); //TODO: Remove this line
      server();
    })
    .catch((error) => {
      console.log("database connection error");
      console.log(error.message);
    });
};

module.exports = connectDb;
