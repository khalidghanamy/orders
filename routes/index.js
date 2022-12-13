const express = require("express");
const router = express.Router();
const usersRoutes = require("./user");
const ordersRoutes = require("./order");



router.use("/users", usersRoutes);
router.use("/orders", ordersRoutes);


router.get("/", (req, res, next) => {
  try {
    res.send(Math.random().toString());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
