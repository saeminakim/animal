<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col> <p>입양신청번호</p></v-col>

        <v-col cols="12" sm="6">
          <v-text-field label="입양신청서 번호" outlined dense></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col> <p>이름</p></v-col>
        <v-col cols="12" sm="6">
          <v-text-field label="이름" outlined dense></v-text-field>
        </v-col>
      </v-row>
      <v-btn depressed @click="getApplication">조회</v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "done",
  methods: {
    getApplication() {
      console.log("getApplication 실행");
      // getApplication 짜야함
    },
  },
};
</script>
