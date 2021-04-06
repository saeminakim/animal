<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="mx-auto my-12" max-width="80%" flat outlined>
            <v-card-title
              ><v-chip class="ma-2" color="orange" text-color="white">
                <v-icon> mdi-paw </v-icon>
                입양신청번호
              </v-chip>
              {{ requestNo }}</v-card-title
            >
            <v-card-text
              >입양신청서가 수정되었습니다.
              <!-- <v-img src="../assets/editted.jpg" alt="입양신청서수정완료">
              </v-img
            >--></v-card-text
            >
          </v-card>
          <v-row justify="center">
            <v-btn depressed @click="backToList">목록으로</v-btn>
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
    this.getRefNo();
    document.querySelector(".v-toolbar").style.flex = "none";
  },
  methods: {
    backToList() {
      return this.$router.push("/");
    },
    getRefNo() {
      console.log(this.$route.params.requestNo);
      this.requestNo = this.$route.params.requestNo;
    },
  },
};
</script>
