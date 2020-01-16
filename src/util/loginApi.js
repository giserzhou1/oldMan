import axios from 'axios'

const request = axios.create()
export default {
  async regist (data) {
    const response = await request.post(
      '/api/user/regist',
      data
    )
    return response
  },
  async login (data) {
    const response = await request.post(
      '/api/user/login',
      data
    )
    return response
  }
  
}
