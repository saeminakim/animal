import axios from 'axios'

export default {
  post: (application) => axios.post(`${process.env.VUE_APP_API_BASE}/apply`, application),
  get: (requestNo, name) => axios.get(`${process.env.VUE_APP_API_BASE}/apply/search?requestNo=${requestNo}&name=${name}`),
  detail: (id) => axios.get(`${process.env.VUE_APP_API_BASE}/apply/search/${id}`),
  edit: (id, application) => axios.patch(`${process.env.VUE_APP_API_BASE}/apply/${id}`, application),
  cancel: (id, application) => axios.patch(`${process.env.VUE_APP_API_BASE}/cancel/${id}`, application),
}