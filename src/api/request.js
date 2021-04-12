import axios from 'axios'

export default {
  post: (application) => axios.post(`${process.env.VUE_APP_API_BASE}/apply`, application),
  get: (requestNo, name) => axios.get(`${process.env.VUE_APP_API_BASE}/apply/search/requestno?requestNo=${requestNo}&name=${name}`),
  email: (email) => axios.get(`${process.env.VUE_APP_API_BASE}/apply/search/email?email=${email}`),
  detail: (id) => axios.get(`${process.env.VUE_APP_API_BASE}/apply/search/${id}`),
  edit: (id, application) => axios.patch(`${process.env.VUE_APP_API_BASE}/apply/${id}`, application),
  cancel: (id, application) => axios.patch(`${process.env.VUE_APP_API_BASE}/cancel/${id}`, application),
}