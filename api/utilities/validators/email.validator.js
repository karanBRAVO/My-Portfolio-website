import EmailValidator from "email-validator";
import isValidPhoneNumber from "libphonenumber-js";

export const IsValidEmail = (email) => {
  return EmailValidator.validate(email);
};

function validatePhoneNumber(phoneNumber, countryCodes) {
  let isValid = false;

  countryCodes.forEach((countryCode) => {
    isValid = isValid || isValidPhoneNumber(phoneNumber, countryCode);
  });

  return isValid;
}

export const IsValidPhone = (phone) => {
  const countryCodes = [
    "US",
    "CA",
    "GB",
    "AU",
    "DE",
    "FR",
    "IT",
    "ES",
    "IN",
    "CN",
    "JP",
    "BR",
    "MX",
    "RU",
    "ZA",
    "NG",
    "EG",
    "SA",
    "KR",
    "TR",
    "AR",
    "CL",
    "CO",
    "PE",
    "VE",
    "ID",
    "MY",
    "PH",
    "TH",
    "VN",
    "SG",
    "NZ",
  ];

  return validatePhoneNumber(phone, countryCodes);
};
