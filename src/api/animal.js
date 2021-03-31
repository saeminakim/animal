import axios from 'axios'

export default {
  // 동물 관련
  list: (page) => axios.get(`${process.env.VUE_APP_API_BASE}/animals?page=${page}&size=12`),

  details: (id) => axios.get(`${process.env.VUE_APP_API_BASE}/animals/${id}`),

  sido: (sido, page) => axios.get(`${process.env.VUE_APP_API_BASE}/animals/filter?sido=${sido}&page=${page}&size=12`)

}