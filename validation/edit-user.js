/* Edit user validation through Validator */

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.currentpassword = !isEmpty(data.currentpassword) ? data.currentpassword : "";
  data.newpassword = !isEmpty(data.newpassword) ? data.newpassword : "";
  data.newpassword2 = !isEmpty(data.newpassword2) ? data.newpassword2 : "";


  if (Validator.isEmpty(data.currentpassword)) {
    errors.currentpassword = "Ingresa una contraseña";
  }

  if (Validator.isEmpty(data.newpassword)) {
    errors.newpassword = "Ingresa nuevamente tu contraseña";
  }

  if (!Validator.isLength(data.newpassword, { min: 6, max: 20 })) {
    errors.newpassword = "Tu contraseña debe contener entre 6 y 20 caractéres";
  }

  if (Validator.isEmpty(data.newpassword2)) {
    errors.newpassword2 = "Ingresa nuevamente tu contraseña";
  }

  if (!Validator.equals(data.newpassword, data.newpassword2)) {
    errors.password2 = "Debe coincidir con la contraseña que ingresaste";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
