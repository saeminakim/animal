<template>
  <div>
    <menu-tabs></menu-tabs>
    <v-container>
      <v-row justify="center">
        <v-col> <p>입양신청번호</p></v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="requestNo"
            label="입양신청서 번호"
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col> <p>이름</p></v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="name"
            label="이름"
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn depressed @click="getApplication">조회</v-btn>
      </v-row>
    </v-container>
  </div>
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
      console.log("getApplication 실행");
      const requestNo = this.requestNo;
      console.log("requestNo : " + requestNo);
      const name = this.name;
      console.log("name : " + name);
      const result = await request.get(requestNo, name);
      const id = result.data[0].id;
      console.log("입양신청서 조회 결과");
      console.log(result.data[0]);
      console.log("입양신청서 id");
      console.log(id);

      this.$router.push({
        name: "appDetails",
        params: { id, requestNo, name },
      });
    },
  },
};
</script>
