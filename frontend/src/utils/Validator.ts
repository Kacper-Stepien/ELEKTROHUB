import {
  emailRegex,
  nameRegex,
  nickRegex,
  passwordRegex,
  phoneRegex,
  surnameRegex,
} from "../consts/regexes";

class Validator {
  static isEmpty = (value: string): boolean => value.trim() === "";

  static isEmail = (value: string): boolean => {
    const regex = emailRegex;
    return regex.test(value);
  };

  static isNick = (value: string): boolean => {
    const regex = nickRegex;
    return regex.test(value);
  };

  static isPassword = (value: string): boolean => {
    const regex = passwordRegex;
    return regex.test(value);
  };

  static isPasswordConfirm = (value: string, password: string): boolean => {
    return value === password;
  };

  static isName = (value: string): boolean => {
    const regex = nameRegex;
    return regex.test(value);
  };

  static isSurname = (value: string): boolean => {
    const regex = surnameRegex;
    return regex.test(value);
  };

  static isPhone = (value: string): boolean => {
    const regex = phoneRegex;
    return regex.test(value);
  };
}

export default Validator;
