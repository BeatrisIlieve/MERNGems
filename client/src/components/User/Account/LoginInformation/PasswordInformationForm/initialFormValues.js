import { PASSWORD_PATTERN } from "../../../../../constants/forms";

const FORM_KEYS = {
  Password: "password",
  NewPassword: "newPassword",
  RetypeNewPassword: "retypeNewPassword",
};

export const INITIAL_FORM_VALUES = {
  [FORM_KEYS.Password]: {
    fieldLabel: "Current Password",
    fieldValue: "",
    regexPattern: PASSWORD_PATTERN,
    errorMessage: "",
    isFocused: false,
  },
  [FORM_KEYS.NewPassword]: {
    fieldLabel: "New Password",
    fieldValue: "",
    regexPattern: PASSWORD_PATTERN,
    errorMessage: "",
    successMessage: "",
    isFocused: false,
  },
  [FORM_KEYS.RetypeNewPassword]: {
    fieldLabel: "Confirm Password",
    fieldValue: "",
    regexPattern: PASSWORD_PATTERN,
    errorMessage: "",
    isFocused: false,
  },
};

export { FORM_KEYS };