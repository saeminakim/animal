<template>
  <v-app>
    <div width="100%" height="250" flat>
      <v-img src="./assets/header.jpg" />
      <v-btn
        icon
        color="#f2f2f2"
        absolute
        right
        top
        href="https://d3g8veh9tv5al6.cloudfront.net/"
        ><v-icon>mdi-cog-outline</v-icon></v-btn
      >
    </div>

    <v-main>
      <v-row justify="center">
        <v-btn
          value="left"
          v-for="(item, i) in items"
          :key="i"
          :href="item.src"
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
.row {
  margin: 0 !important;
}
</style>

<script>
import cookie from "./plugins/cookie";
export default {
  name: "App",
  data: () => ({
    selectedItem: 0,
    items: [
      {
        text: "유기동물",
        src: "http://animal-vueapp.s3-website.ap-northeast-2.amazonaws.com/",
      },
      {
        text: "분실/보호동물",
        src: "https://d3morrlmvsmqh2.cloudfront.net/",
      },
      {
        text: "입양후기",
        src: "https://d3m5znvls41rz2.cloudfront.net/",
      },
      {
        text: "동물병원",
        src:
          "http://animal-teamproject.s3-website.ap-northeast-2.amazonaws.com/hospital",
      },
    ],
  }),
  computed: {
    profile() {
      return this.$store.state.profile.data;
    },
  },
  mounted() {
    if (cookie.getSession() != undefined) {
      this.$store.dispatch("profile/setProfile");
    }
  },
};
</script>