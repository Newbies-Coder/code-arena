import axios from 'axios'

describe('POST /', () => {
  it('should return a message', async () => {
    const res = await axios.post(`http://localhost:8080/api/v1/users/login`)

    expect(res.status).toBe(200)
    expect(res.data).toEqual({ message: 'Hello API' })
  })
})
