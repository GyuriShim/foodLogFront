import axios from "axios"

const instance = axios.create({
	baseURL: "http://10.0.2.2:8080/api",
	timeout: 1000,
})

export default instance

// service.interceptors.request.use(
//   (config) => {
//     const token = store.getters.getToken;

//     if (token) {
//       // let each request carry token
//       config.headers.Authorization = token;
//     }
//     // console.log("config: " + config);
//     return config;
//   },
//   (error) => {
//     // do something with request error
//     console.log(error); // for debug
//     return Promise.reject(error);
//   }
// );

// response interceptor
// service.interceptors.response.use(
//   /**
//    * If you want to get http information such as headers or status
//    * Please return  response => response
//    */

//   /**
//    * Determine the request status by custom code
//    * Here is just an example
//    * You can also judge the status by HTTP Status Code
//    */
//   (response) => {
//     console.log(response);
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       return error;
//     }
//     console.log(error.response);
//     console.log(error); // for debug
//     console.log(Promise.reject(error));
//     return Promise.reject(error);
//   }
// )
