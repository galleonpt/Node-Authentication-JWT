const {
  Joi,
  celebrate
} = require("celebrate");

const userSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = userSchema