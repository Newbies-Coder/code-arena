export const regexEmail = (value: string) => {
  const expression = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
  return expression.test(value)
}

export const regexPassword = (value: string) => {
  const expression = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)
  return expression.test(value)
}

export const regexPasswordPattern: RegExp = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/
