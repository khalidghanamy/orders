const User = require("../models/user");

class UserController {
  static async createUser(req, res, next) {
    try {
      const user = await new User({
        name: req.body.name,
        roles: req.body.roles
      });
      const savedUser = await user.save();
      return res.status(201).json({
        message: "User created successfully",
        user: savedUser,
        result: true
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;