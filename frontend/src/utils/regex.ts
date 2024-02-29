export const regexEmail = (value: string) => {
  const expression = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
  return expression.test(value)
}

///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
export const regexPasswordPattern: RegExp = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/

export const regexDateOfBirth =
  /^(?:(?:19|20)[0-9]{2})-(?:(?:0[1-9]|1[0-2]))-(?:(?:0[1-9]|1\d|2[0-8])|(?:29-02-(?:(?:19|20)(?:[02468][048]|[13579][26])|2000)))$/
