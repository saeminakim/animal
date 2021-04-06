<template>
  <v-app>
    <v-app-bar width="100%" height="250" flat src="./assets/header.jpg">
      <v-btn icon color="#f2f2f2" absolute right top
        ><v-icon>mdi-cog-outline</v-icon></v-btn
      >
    </v-app-bar>
    <!-- <div class="header">
       <img src="./assets/header.jpg" />
    </div> -->

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
      { text: "분실/보호동물", path: "/lostAndFoundAnimal" },
      { text: "입양후기", path: "/reviewMain" },
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