/* Post validation through Validator */

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Asegúrate que tu historia tenga 10 o hasta 300 caractéres";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Debes contarnos algo...";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
