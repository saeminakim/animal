<template>
  <v-tabs align-with-title v-model="selectedTab">
    <v-tabs-slider color="orange"></v-tabs-slider>
    <v-tab v-for="(menu, i) in menus" :key="i" @click="navigateTo(menu)">
      {{ menu.text }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { text: "유기동물", path: "/" },
        { text: "입양신청내역조회", path: "/application" },
      ],
      selectedTab: 0,
    };
  },
  methods: {
    navigateTo(menu) {
      if (this.$route.path != menu.path) {
        this.$router.push(menu.path);
      }
    },
    // async signOut() {
    //   console.log("----sign out----");
    //   this.$store.dispatch("profile/signout");
    // },
  },
  // computed: {
  //   profile() {
  //     return this.$store.state.profile.data;
  //   },
  // },
  mounted() {
    // console.log(this.$store.state.profile);
    // this.$store.dispatch("profile/setProfile");
    this.menus.forEach((menu, i) => {
      if (this.$route.path === menu.path) {
        this.selectedTab = i;
      }
    });
  },
};
</script>
