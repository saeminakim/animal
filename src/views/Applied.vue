<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="mx-auto my-12" max-width="80%" flat>
            <v-card-title>입양신청서 번호 들어갈 자리</v-card-title>
            <v-card-text
              >신청이 완료되었습니다. <br />
              심사에 2-3일 소요되며, 진행 상황은 입양신청조회 메뉴를 이용하시기
              바랍니다.
            </v-card-text>
          </v-card>
          <v-btn depressed @click="backToList">목록</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "done",
  methods: {
    backToList() {
      return this.$router.push("/animals");
    },
  },
};
</script>
