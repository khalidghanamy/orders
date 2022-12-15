const dotenv = require("dotenv");
const connectDb = require("./database/connectDb");
dotenv.config();

const app = require("./app");

const myServer = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};

connectDb(process.env.MONGO_URL, myServer);
