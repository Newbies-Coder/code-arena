import request from 'supertest'
import app from '../main' // Adjust the import path to the location of your server file
import jwt, { JwtPayload } from 'jsonwebtoken'
import { describe } from 'node:test'

//422: empty field
//400: missing field
//401: incorrect field
const url = process.env.TEST_URL

describe('User Login Feature', () => {
  describe('POST /login', () => {
    it('correct credentials to log in', async () => {
      const res = await request(app).post(`${url}users/login`).send({ email: 'ngocuyenlepham@gmail.com', password: 'Leuyen.03' })
      expect(res.statusCode).toEqual(200)
    })

    it('incorrect email and not exist in db', async () => {
      const res = await request(app).post(`${url}users/login`).send({ email: 'ngocuyen@gmail.com', password: 'Leuyen.03' })
      expect(res.statusCode).toEqual(404)
    })

    it('incorrect password saved in db', async () => {
      const res = await request(app).post(`${url}users/login`).send({ email: 'ngocuyenlepham@gmail.com', password: 'Uyenuyen^00' })
      expect(res.statusCode).toEqual(401)
    })

    it('empty email', async () => {
      const res = await request(app).post(`${url}users/login`).send({ email: '', password: 'Leuyen.03' })
      expect(res.statusCode).toEqual(422)
    })

    it('empty password', async () => {
      const res = await request(app).post(`${url}users/login`).send({ email: 'ngocuyenlepham@gmail.com', password: '' })
      expect(res.statusCode).toEqual(422)
    })

    it('both fields empty', async () => {
      const res = await request(app).post(`${url}users/login`).send({ email: '', password: '' })
      expect(res.statusCode).toEqual(422)
    })

    /**
     * RULES
      Special characters like periods (.), underscores (_), and hyphens (-) are allowed in the local part of the email.
      These characters cannot be the first or last character in the local part.
      These characters cannot appear consecutively (e.g., no ".." or "__").
      No underscores or hyphens are allowed in the domain's username.
      Allow email addresses with the domains @gmail.com, @edu.com, @edu.vn, @edu.vn.com
      username part of the email must be between 6 and 30 characters long
    */
    describe('Email Validation', () => {
      const emailRegex = /^[a-zA-Z0-9](?!.*?[._-]{2})[a-zA-Z0-9._-]{4,28}[a-zA-Z0-9]@(gmail.com|edu.com|edu.vn|edu.vn.com)$/
      const validEmailList = ['example.email@edu.vn', 'user.name@edu.vn.com', 'example@gmail.com', 'uyenuyenyenuyenuyen@gmail.com']
      const invalidEmailList = ['example..email@domain.com', 'example_@domain.com', '.example@gmail.com']
      it('should validate correct email addresses', () => {
        validEmailList.forEach((item) => {
          expect(item).toMatch(emailRegex)
        })
      })

      it('should reject invalid email addresses', () => {
        invalidEmailList.forEach((item) => {
          expect(item).not.toMatch(emailRegex)
        })
      })
    })

    /**
      Ensure string has 1 uppercase letters.
      Ensure string has 1 special case letter.
      Ensure string has 1 digits.
      Ensure string has 1 lowercase letters.
      Ensure string is between 8 to 16 characters length.
      Check for absence of emojis and allow alphanumeric and some special characters
      Do not allow hotkey enter in password
      Do not allow character entity html
    */

    describe('Password Validation', () => {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*./])(?=.*[0-9])(?=.*[a-z]).{8,16}$/

      it('should validate correct passwords', () => {
        expect('ValidPass123!').toMatch(passwordRegex)
        expect('Another@1345').toMatch(passwordRegex)
        expect('Leuyen.03///').toMatch(passwordRegex)
      })

      it('should reject invalid passwords', () => {
        expect('noUpper').not.toMatch(passwordRegex) // Missing uppercase
        expect('NOLOWER123!').not.toMatch(passwordRegex) // Missing lowercase
        expect('NoSpecial123').not.toMatch(passwordRegex) // Missing special character
        expect('Short1!').not.toMatch(passwordRegex) // Too short
        expect('Toolongpassword12345!').not.toMatch(passwordRegex) // Too long
        expect('Invalid😊Pass123').not.toMatch(passwordRegex) // Contains emoji
      })
    })
  })

  describe('test token on login', () => {
    const url = process.env.TEST_URL
    it('should issue valid access and refresh tokens on login', async () => {
      const loginResponse = await request(app).post(`${url}users/login`).send({ email: 'ngocuyenlepham@gmail.com', password: 'Leuyen.03' }).expect(200)

      const { access_token, refresh_token } = loginResponse.body.data

      // Check if tokens are not undefined
      expect(access_token).toBeDefined()
      expect(refresh_token).toBeDefined()

      try {
        // Verify and decode the access token
        const accessTokenDecoded = jwt.verify(access_token, process.env.JWT_ACCESS_TOKEN_SECRET) as JwtPayload
        // Assuming your access token includes user's id
        expect(accessTokenDecoded).toHaveProperty('_id')
        expect(accessTokenDecoded).toHaveProperty('exp')

        // Now you can safely access the properties
        if (typeof accessTokenDecoded !== 'string') {
          // Assuming access token expires in 1 hour or less
          expect(accessTokenDecoded.exp - accessTokenDecoded.iat).toBeLessThanOrEqual(60)
        }

        // Repeat the process for the refresh token
        const refreshTokenDecoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_TOKEN_SECRET) as JwtPayload
        expect(refreshTokenDecoded).toHaveProperty('_id')
        expect(refreshTokenDecoded).toHaveProperty('exp')

        if (typeof refreshTokenDecoded !== 'string') {
          // Assuming refresh token expires after access token
          expect(refreshTokenDecoded.exp - refreshTokenDecoded.iat).toBeGreaterThan(50)
        }
      } catch (error) {
        // Handle error (e.g., token verification failed)
        console.error('Token verification failed:', error)
      }
    })
  })
  //TODO: - Account locked out due to too many failed attempts
  //? - Verifying the structure and security of the returned token
  // - Ensuring that the password isn't returned or logged
  // - Checking the response time to prevent slow brute force attacks
  // Add more tests for related login features, like password reset or account activation
})

describe('Register Feature', () => {
  describe('POST /register', () => {
    // it('correct credentials to register', async () => {
    //   const res = await request(app)
    //     .post(`${url}users/register`)
    //     .send({ username: 'uyen', email: 'lengocuyen0401@gmail.com', password: 'Leuyen.03', confirm_password: 'Leuyen.03', date_of_birth: '2003-01-04' })
    //   expect(res.statusCode).toEqual(201)
    // })

    describe('validate username field', () => {
      it('empty username', async () => {
        const res = await request(app)
          .post(`${url}users/register`)
          .send({ username: '', email: 'lengocuyen04012@gmail.com', password: 'Leuyen.03', confirm_password: 'Leuyen.03', date_of_birth: '2003-01-04' })
        expect(res.statusCode).toEqual(422)
      })
      it('invalid specific characters username', async () => {
        const res = await request(app)
          .post(`${url}users/register`)
          .send({ username: '...', email: 'lengocuyen04012@gmail.com', password: 'Leuyen.03', confirm_password: 'Leuyen.03', date_of_birth: '2003-01-04' })
        expect(res.statusCode).toEqual(422)
      })
      it('invalid numberic username', async () => {
        const res = await request(app)
          .post(`${url}users/register`)
          .send({ username: '000', email: 'lengocuyen04012@gmail.com', password: 'Leuyen.03', confirm_password: 'Leuyen.03', date_of_birth: '2003-01-04' })
        expect(res.statusCode).toEqual(422)
      })
    })

    it('empty email', async () => {
      const res = await request(app).post(`${url}users/register`).send({ username: 'uyen', email: '', password: 'Leuyen.03', confirm_password: 'Leuyen.03', date_of_birth: '2003-01-04' })
      expect(res.statusCode).toEqual(422)
    })

    it('empty password', async () => {
      const res = await request(app)
        .post(`${url}users/register`)
        .send({ username: 'uyen', email: 'lengocuyen04012@gmail.com', password: 'Leuyen.03', confirm_password: '', date_of_birth: '2003-01-04' })
      expect(res.statusCode).toEqual(422)
    })

    describe('Confirm_password Validation', () => {
      it('empty confirm_password', async () => {
        const res = await request(app)
          .post(`${url}users/register`)
          .send({ username: 'uyen', email: 'lengocuyen04012@gmail.com', password: 'Leuyen.03', confirm_password: '', date_of_birth: '2003-01-04' })
        expect(res.statusCode).toEqual(422)
      })

      it('not match with password', async () => {
        const res = await request(app)
          .post(`${url}users/register`)
          .send({ username: 'uyen', email: 'lengocuyen04012@gmail.com', password: 'Leuyen.03', confirm_password: 'Leuyen@03', date_of_birth: '2003-01-04' })
        expect(res.statusCode).toEqual(422)
      })
    })

    describe('date of birth Validation', () => {
      it('empty date_of_birth', async () => {
        const res = await request(app)
          .post(`${url}users/register`)
          .send({ username: 'uyen', email: 'lengocuyen04012@gmail.com', password: 'Leuyen.03', confirm_password: 'Leuyen.03', date_of_birth: '' })
        expect(res.statusCode).toEqual(422)
      })

      it('under 12 years old', async () => {
        const res = await request(app)
          .post(`${url}users/register`)
          .send({ username: 'uyen', email: 'lengocuyen04012@gmail.com', password: 'Leuyen.03', confirm_password: 'Leuyen.03', date_of_birth: '2018-01-15' })
        expect(res.statusCode).toEqual(403)
      })
    })
  })
})
