const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async create(request, response) {
    const emailExists = await User.findOne({
      email: request.body.email,
    });

    if (emailExists) return response.status(400).send("Email already exists");

    const hashedPw = await bcrypt.hash(request.body.password, 10);

    const user = new User({
      name: request.body.name,
      email: request.body.email,
      password: hashedPw,
    });

    try {
      const savedUser = await user.save();
      return response.status(201).send(savedUser);
    } catch (e) {
      return response.status(400);
    }
  },

  async login(request, response) {
    const user = await User.findOne({
      email: request.body.email,
    });

    if (!user) return response.status(400).send("Email is not found");

    const validPW = await bcrypt.compare(request.body.password, user.password);

    if (!validPW) return response.status(400).send("Invalid Password");

    const token = jwt.sign({
      _id: user._id
    }, process.env.TOKEN);
    response.header("auth-token", token).send(token);
  }
}