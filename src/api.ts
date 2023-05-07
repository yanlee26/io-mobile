import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:1357',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
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
export function addFamily(params:any,isIo=true) {
    instance.post(`/insert/${isIo ? 'io':'la'}`, params)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}