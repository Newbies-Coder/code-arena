import slugify from 'slugify'
import { VALIDATION_MESSAGES } from '~/constants/message'

// Validation date-of-birth
export const isValidDateOfBirth = (dateString: string): boolean => {
  const regex =
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
  return regex.test(dateString)
}

// Generate slug from name
export const generateSlug = (name: string): string => {
  return slugify(name, {
    replacement: '-',
    remove: undefined,
    lower: true,
    strict: false,
    trim: true
  })
}

// Validation email domain
export const validateEmailDomain = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._-]+@(gmail\.com|gmail\.edu\.com)$/
  return regex.test(email)
}

// Validation Vietnamese phone number
export const validatePhone = (phone: string): boolean => {
  const regex = /(0[3|5|7|8|9])+([0-9]{8})\b/
  return regex.test(phone)
}

// Validattion first_name and last_name anphabetic charater
export const isValidNameCharater = (str: string): boolean => {
  const regex = /^[A-Za-zÀ-Ạà-ạÁ-Ắá-ắÂ-Ậâ-ậÄ-äÈ-Ẹè-ẹÉ-Ếé-ếÊ-Ệê-ệÌ-Ịì-ịÍ-íÒ-Ọò-ọÓ-Ốó-ốÔ-Ộô-ộÖ-öÙ-Ụù-ụÚ-Ứú-ứÛ-ûÜ-üĐđ\s]+$/
  return regex.test(str)
}

// Validation name contains multiple consecutive spaces
export const isValidMulName = (name: string): boolean => {
  const excessiveWhitespaceRegex = /\s{2,}/
  return !excessiveWhitespaceRegex.test(name)
}

// Validation url avatar and cover photo
export const isValidImageUrl = (url: string): boolean => {
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
  const imageRegex = /\.(jpeg|jpg|gif|png)$/
  return urlRegex.test(url) && imageRegex.test(url)
}

// Check gender includes: Male, Female, Other...ect..
export const isValidGender = (gender: string): boolean => {
  const validGenders = ['male', 'female', 'other']
  return validGenders.includes(gender.toLowerCase())
}

export const isValidEmail = (email: string): boolean => {
  // Regex to check for at least one special character
  const specialCharRegex = /^[A-Za-z0-9._-]+@/
  // Regex to ensure the domain is either @gmail.com or @gmail.edu.com
  const domainRegex = /@(gmail\.com|gmail\.edu\.com)$/
  return specialCharRegex.test(email) && domainRegex.test(email)
}

// Validation password notifiation detail error
export const validateEmail = (email: string): { valid: boolean; message: string } => {
  const noSpecialCharRegex = /^[A-Za-z0-9._-]+@/
  const domainRegex = /@(gmail\.com|gmail\.edu\.com)$/
  if (!noSpecialCharRegex.test(email)) {
    return { valid: false, message: VALIDATION_MESSAGES.USER.EMAIL.CONTAIN_SPECAIL_CHARACTER }
  }
  if (!domainRegex.test(email)) {
    return { valid: false, message: VALIDATION_MESSAGES.USER.EMAIL.VALID_DOMAIN }
  }
  return { valid: true, message: '' }
}

// Validation password check for absence of emojis and allow alphanumeric and some special characters
export const isValidPassword = (password: string): boolean => {
  const noEmojiRegex = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/
  return noEmojiRegex.test(password)
}
