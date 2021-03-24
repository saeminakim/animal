<template>
  <v-app>
    <div class="header">
      <img src="./assets/header.jpg" />
    </div>

    <v-main>
      <v-row justify="center">
        <v-btn
          value="left"
          v-for="(item, i) in items"
          :key="i"
          @click="navigateTo(item)"
          width="20%"
          height="70px"
          text
        >
          <h2 v-text="item.text"></h2>
        </v-btn>
      </v-row>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style lang="scss">
.header {
  overflow: hidden;
  width: 100%;
  height: auto;

  img {
    width: 100%;
    vertical-align: top;
  }
}

.row {
  margin: 0 !important;
}
</style>


<script>
export default {
  name: "App",
  data: () => ({
    //
    drawer: false, // drawer의 기본 값
    selectedItem: 0,
    items: [
      /* https://cdn.materialdesignicons.com/5.4.55/ */
      { text: "유기동물", path: "/" },
      { text: "분실/보호동물", path: "/LostAndFoundAnimal" },
      { text: "입양후기", path: "/ReviewMain" },
      { text: "관리자", path: "/manager" },
    ],
  }),

  methods: {
    navigateTo(item) {
      /* https://router.vuejs.org/kr/guide/essentials/navigation.html */
      // 현재 경로와 다르면
      if (this.$route.path != item.path) {
        // 라우터에 경로 추가
        this.$router.push(item.path);
      }
    },
  },
};
</script>