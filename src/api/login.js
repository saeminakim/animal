// import axios from 'axios'
// import cookie from '../plugins/cookie'

// const instance = axios.create({
//   headers: { 'Authorization': `Bearer ${cookie.getSession()}` }
// });

// instance.interceptors.response.use(res => res,
//   error => {
//     if ([401, 403].indexOf(error.response.status) > -1) {
//       cookie.clearSession();
//       window.location.href = process.env.VUE_APP_LOGIN_URL;
//     }

//     return Promise.reject(error);

//   });

// export default instance;