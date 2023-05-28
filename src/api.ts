import axios from 'axios'

const url = process.env.NODE_ENV  ==='development' ? 'http://localhost:1357' : 'http://47.96.25.9'
const instance = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status < 400) {
      // Handle 400 errors here
      console.log('Error 400:', error.response.data);
      return Promise.resolve(error.response.data)
    }
    return Promise.reject(error);
  }
);
export function addFamily(params: any, isIo = true) {
  return instance.post(`/${isIo ? 'io' : 'la'}/users/add`, params)
    .then(function (response) {
      console.log(response);
    })
}