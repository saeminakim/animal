import axios from 'axios'

export default {
  list: (page) => axios.get(`${process.env.VUE_APP_API_BASE}/animals?page=${page}&size=12`),

  details: (id) => axios.get(`${process.env.VUE_APP_API_BASE}/animals/${id}`)
}