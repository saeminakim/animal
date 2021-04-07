<template>
  <!-- <v-container grid-list-xl> -->
  <!-- <v-toolbar flat height="15px"> -->
  <!-- <template v-slot:extension> -->
  <v-tabs align-with-title>
    <v-tabs-slider color="orange"></v-tabs-slider>
    <v-tab v-for="(menu, i) in menus" :key="i" @click="navigateTo(menu)">
      {{ menu.text }}
    </v-tab>
  </v-tabs>
  <!-- </template> -->
  <!-- </v-toolbar> -->
  <!-- </v-container> -->
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { text: "유기동물", path: "/" },
        { text: "입양신청내역조회", path: "/application" },
      ],
    };
  },
  methods: {
    navigateTo(menu) {
      if (this.$route.path != menu.path) {
        this.$router.push(menu.path);
      }
    },
    async signOut() {
      console.log("----sign out----");
      this.$store.dispatch("profile/signout");
    },
  },
  computed: {
    profile() {
      return this.$store.state.profile.data;
    },
  },
  mounted() {
    console.log(this.$store.state.profile);
    this.$store.dispatch("profile/setProfile");
  },
};
</script>
