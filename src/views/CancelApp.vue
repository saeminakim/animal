<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="mx-auto my-12" max-width="90%" flat>
          <v-card-title>입양신청 취소요청</v-card-title>
          <v-card-text>
            입양취소가 확정되면 번복할 수 없습니다. <br />
            추후 입양신청시 제약이 있을 수 있으니 신중하게 결정해주시기
            바랍니다. <br />
            취소 사유를 적어주시면 심사 후 취소가 완료됩니다.
          </v-card-text>
          <v-textarea v-model="application.reason" outlined> </v-textarea>
        </v-card>
        <v-row justify="center">
          <v-btn depressed color="error" @click="cancel(application)"
            >취소신청</v-btn
          >
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

      if (result.status == 200) {
        this.application = result.data;
        this.application.reason = "";
      }
    },

    async cancel(application) {
      this.application.status = "취소신청";

      const id = this.application.id;
      await request.cancel(id, application);
      // console.log(result);

      return this.$router.push("/canceled");
    },
  },
};
</script>
