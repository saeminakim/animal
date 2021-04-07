<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="mx-auto my-12" max-width="80%" flat>
            <v-card-title>취소 요청이 완료되었습니다.</v-card-title>
            <v-card-text></v-card-text>
          </v-card>
          <v-row justify="center">
            <v-btn depressed @click="backToList">목록</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    requestNo: "",
  }),
  mounted() {
    document.querySelector(".v-toolbar").style.flex = "none";
  },
  methods: {
    backToList() {
      return this.$router.push("/");
    },
  },
};
</script>
