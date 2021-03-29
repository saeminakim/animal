<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="mx-auto my-12" max-width="80%" flat>
          <v-card-title>입양신청 취소</v-card-title>
          <v-card-text>취소 희망하는 이유를 적어주세요. </v-card-text>
          <v-textarea v-model="application.reason" outlined> </v-textarea>
        </v-card>
        <v-row justify="center">
          <v-btn depressed @click="cancel(application)">취소신청</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import request from "../api/request";

export default {
  data: () => ({
    application: [],
  }),
  mounted() {
    this.getApp();
  },
  methods: {
    async getApp() {
      const id = this.$route.params.id;
      const result = await request.detail(id);
      console.log("---입양신청 취소---");
      console.log(result.data);
      if (result.status == 200) {
        this.application = result.data;
        this.application.reason = "";
      }
    },

    async cancel(application) {
      this.application.status = "취소신청";
      console.log("application");
      console.log(application);
      const id = this.application.id;
      const result = await request.cancel(id, application);
      console.log("---입양신청 취소 결과---");
      console.log(result);
    },
  },
};
</script>
