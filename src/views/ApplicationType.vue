<template>
  <v-container>
    <menu-tabs></menu-tabs>
    <v-container>
      <v-row justify="center">
        <v-card class="mx-auto my-12" max-width="80%" flat>
          <v-img src="../assets/animaltype.jpg" max-width="380"></v-img>
          <v-card-title></v-card-title>
          <v-row justify="center">
            <v-col cols="auto"
              ><v-btn depressed large color="yellow" @click="kakaoLogin"
                >카카오 로그인 <v-icon>mdi-chat</v-icon></v-btn
              ></v-col
            >
            <v-divider vertical></v-divider>
            <v-col cols="auto"
              ><v-btn
                depressed
                color="orange"
                class="white--text"
                large
                @click="applyAdoption(id)"
                >비회원 입양신청 <v-icon>mdi-paw</v-icon></v-btn
              ></v-col
            >
          </v-row>
        </v-card>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    id: "",
  }),
  mounted() {
    this.id = this.$route.params.id;
  },
  methods: {
    applyAdoption(id) {
      this.$router.push({ name: "apply", params: { id } });
    },
    kakaoLogin() {
      if (
        window.location.hostname == "localhost" ||
        window.location.hostname == "127.0.0.1"
      ) {
        window.location.href = `http://127.0.0.1:5500/signin.html?url=${encodeURIComponent(
          `http://127.0.0.1:8081/#/apply/${this.id}`
        )}`;
      } else {
        window.location.href = `http://animal-vueapp.s3-website.ap-northeast-2.amazonaws.com/signin.html?url=${encodeURIComponent(
          `http://animal-vueapp.s3-website.ap-northeast-2.amazonaws.com/#/apply/${this.id}`
        )}`;
      }
    },
  },
};
</script>