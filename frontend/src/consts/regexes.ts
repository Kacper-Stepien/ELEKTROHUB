export const emailRegex = /\S+@\S+\.\S+/;
export const nickRegex = /^[a-z0-9]{5,25}$/;
export const passwordRegex = /.{8,}/;
export const nameRegex =
  /^[A-ZŁŚ][a-złóśćąęń]{1,20}(\s[A-ZŁŚ][a-złóśćąęń]{1,20})?$/;
export const surnameRegex =
  /^[A-ZŁŚ][a-złóśćąęń]{1,20}(-[A-ZŁŚ][a-złóśćąęń]{1,20})?$/;
export const phoneRegex = /^[0-9]{9}$/;
