import Joi from "joi";

export const registerUserValidation = Joi.object({
  userName: Joi.string()
    .max(50)
    .required()
    .custom((value, helpers) => {
      if (value !== value.toLowerCase()) {
        return helpers.error("any.invalid");
      }
      return value;
    }),
  userPassword: Joi.string().max(100).required(),
});

export const loginUserValidation = Joi.object({
  userName: Joi.string()
    .max(50)
    .required()
    .custom((value, helpers) => {
      if (value !== value.toLowerCase()) {
        return helpers.error("any.invalid");
      }
      return value;
    }),
  userPassword: Joi.string().max(100).required(),
});
