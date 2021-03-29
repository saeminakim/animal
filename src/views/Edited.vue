<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="mx-auto my-12" max-width="80%" flat>
            <v-card-title>입양신청서 번호 들어갈 자리</v-card-title>
            <v-card-text>입양신청서가 수정되었습니다. </v-card-text>
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
  methods: {
    backToList() {
      return this.$router.push("/");
    },
  },
};
</script>
