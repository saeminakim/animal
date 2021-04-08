// export default {
//   getSession: () => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; sid=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//   },
//   clearSession: () => {
//     console.log(document.cookie);
//     console.log(`sid=;expires=${new Date(0).toUTCString()}`);
//     document.cookie = `sid=;expires=${new Date(0).toUTCString()}`
//     console.log(document.cookie);
//   }
// }