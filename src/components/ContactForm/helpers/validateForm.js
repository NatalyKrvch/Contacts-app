import { EMAIL_REGEX, NAME_ERROR_MESSAGE } from "../constants"


export const validateForm = (firstName, lastName, email) => {
  const newErrors = {}
  const isNameEmpty = !firstName && !lastName
  const isEmailValid = EMAIL_REGEX.test(email)

  if (isNameEmpty) {
    newErrors.firstName = NAME_ERROR_MESSAGE
    newErrors.lastName = NAME_ERROR_MESSAGE
  }

  if (!isEmailValid) {
    newErrors.email = 'Please enter a valid email address.'
  }

  return newErrors
}
