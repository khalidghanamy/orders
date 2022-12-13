const express = require("express");
const cors = require("cors");
const router = require("./routes");
const apiErrorHandler = require("./error/api-error-handler");
const app = express();

//===== Middlewares ==========================================
// app.use(apiLimiter);
// app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(verifyToken)
//===== Routes ==========================================
app.use("/", router);

//===== Error Handler ==========================================
app.use(apiErrorHandler);

module.exports = app;
