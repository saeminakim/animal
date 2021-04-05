<template>
  <v-container>
    <menu-tabs></menu-tabs>
    <v-container>
      <v-row justify="center">
        <v-col cols="2"> <p align="center">입양신청번호</p></v-col>

        <v-col cols="2">
          <v-text-field v-model="requestNo" outlined dense></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="2"> <p align="center">이름</p></v-col>
        <v-col cols="2">
          <v-text-field v-model="name" outlined dense></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn
          color="orange"
          class="white--text"
          depressed
          @click="getApplication"
          >조회</v-btn
        >
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import request from "../api/request";

export default {
  name: "done",
  data: () => ({
    requestNo: null,
    name: "",
  }),
  methods: {
    async getApplication() {
      const requestNo = this.requestNo;
      const name = this.name;
      const result = await request.get(requestNo, name);

      if (result.status == 200) {
        const id = result.data[0].id;

        this.$router.push({
          name: "appDetails",
          params: { id, requestNo, name },
        });
      }
    },
  },
};
</script>
