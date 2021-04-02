import axios from 'axios'

export default {
  // 동물 관련
  list: (page) => axios.get(`${process.env.VUE_APP_API_BASE}/animals?page=${page}&size=12`),

  details: (id) => axios.get(`${process.env.VUE_APP_API_BASE}/animals/${id}`),

  sido: (sido, page) => axios.get(`${process.env.VUE_APP_API_BASE}/animals/filter/sido?sido=${sido}&page=${page}&size=12`),

  sidoType: (sido, type, page) => axios.get(`${process.env.VUE_APP_API_BASE}/animals/filter/sido-type?sido=${sido}&type=${type}&page=${page}&size=12`),

  sidoTypeStatus: (sido, type, status, page) => axios.get(`${process.env.VUE_APP_API_BASE}/animals/filter/sido-type?sido=${sido}&type=${type}&status=${status}&page=${page}&size=12`),

  type: (type, page) => axios.get(`${process.env.VUE_APP_API_BASE}/animals/filter/type?type=${type}&page=${page}&size=12`),

  typeStatus: (type, status, page) => axios.get(`${process.env.VUE_APP_API_BASE}/animals/filter/type-status?type=${type}&status=${status}&page=${page}&size=12`),

  sidoStatus: (sido, status, page) => axios.get(`${process.env.VUE_APP_API_BASE}/animals/filter/sido-status?sido=${sido}&status=${status}&page=${page}&size=12`),

  status: (status, page) => axios.get(`${process.env.VUE_APP_API_BASE}/animals/filter/status?status=${status}&page=${page}&size=12`),

}