import axios from 'axios'
import Environment from '../shared/constants/AppConstants'

const BASE_URL = Environment.API_BASE_URL
const instance = axios.create({
  baseURL: BASE_URL,
})
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error)
  }
)
class ApiService {
  async get(path: string): Promise<any> {
    try {
      const res = await instance.get(path)
      return res.data
    } catch (error) {
      throw error
    }
  }

  async post(path: string, data: any): Promise<any> {
    try {
      const res = await instance.post(path, data)
      return res.data
    } catch (error) {
      throw error
    }
  }

  async put(path: string, data: any): Promise<any> {
    try {
      const res = await instance.put(path, data)
      return res.data
    } catch (error) {
      throw error
    }
  }

  async delete(path: string): Promise<any> {
    try {
      const res = await instance.delete(path)
      return res.data
    } catch (error) {
      throw error
    }
  }
}
export default new ApiService()
