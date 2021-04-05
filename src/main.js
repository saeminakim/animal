import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import menuTabs from './components/MenuTabs'

// 컴포넌트를 전역으로 만들어줌
//            '태그명으로 사용할 이름', 임포트해온 이름
Vue.component('menu-tabs', menuTabs)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
