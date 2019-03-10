import validator from 'validator';

const validateInput = (type, value) => {
  switch (type.toUpperCase()) {
    case 'NUMBER':
      return validator.isNumeric(value);
    default:
      return false;
  }
};

export default validateInput;
