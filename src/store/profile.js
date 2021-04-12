import api from '../api/profile'
import cookie from '../plugins/cookie'

export default {
  namespaced: true,
  state: () => ({
    data: {},
    init: {
      id: 0,
      userId: "",
      userType: "",
      name: "",
      email: "",
      image: "",
    },
  }),
  mutations: {
    setProfile(state, payload) {

      state.data = { ...payload };
    }
  },
  actions: {
    async setProfile(context) {
      if (cookie.getSession()) {
        context.commit('setProfile', context.state.init);
        const res = await api.get();
        context.commit('setProfile', res.data);
      } else {
        window.location.href = process.env.VUE_APP_LOGIN_URL;
      }
    },
    async signOut(context) {
      let res = await api.signout();
      console.log(res)
      context.commit('setProfile', context.state.init);

      cookie.clearSession();
      window.location.href = process.env.VUE_APP_LOGIN_URL;
    }
  }
}