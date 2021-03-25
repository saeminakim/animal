import axios from 'axios'

export default {
  post: (application) => axios.post(`${process.env.VUE_APP_API_BASE}/apply`, application)
}