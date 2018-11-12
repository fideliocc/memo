// Checks if "value" is empty and returns true. Helper function for Validator library
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

// This is export for common js
// module.exports = isEmpty;

// JSX (React) uses ES6 syntax
export default isEmpty;
