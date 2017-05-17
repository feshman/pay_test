import request from 'supertest'
import { baseUrl } from '../context/config'

export default request(baseUrl)