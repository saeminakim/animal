<template>
<!-- 상단 메뉴 탭 -->
  <v-tabs
    align-with-title
  >
    <v-tab v-for="(menu, i) in menus" :key = "i" @click="navigateTo(menu)">
      {{ menu.text }}
    </v-tab>
  </v-tabs>

</template>

<script>
export default {
  data () {
    return {
      menus: [
        { text: '유기동물', path: '/AnimalList' },
        { text: '입양신청내역조회', path: '/Request' }
      ], 
    }
  },
  methods: {
    navigateTo(menu){
      if(this.$route.path != menu.path){
        this.$router.push(menu.path);
      }
    }
  }
}
</script>
