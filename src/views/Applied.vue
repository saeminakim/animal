<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="mx-auto my-12" max-width="80%" flat>
            <v-card-title>신청번호 : {{ requestNo }}</v-card-title>
            <v-card-text
              >입양신청이 완료되었습니다. <br />
              심사에 2-3일 소요되며, 진행 상황은 입양신청조회 메뉴를 이용하시기
              바랍니다.
            </v-card-text>
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
  name: "done",
  data: () => ({
    requestNo: "",
  }),
  mounted() {
    this.getRefNo();
  },
  methods: {
    backToList() {
      return this.$router.push("/animals");
    },

    getRefNo() {
      console.log(this.$route.params.requestNo);
      this.requestNo = this.$route.params.requestNo;
    },
  },
};
</script>
