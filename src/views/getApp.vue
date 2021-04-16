<template>
  <v-container>
    <menu-tabs></menu-tabs>
    <v-container>
      <v-row justify="center">
        <v-col cols="4">
          <v-card flat>
            <v-row justify="center" class="mt-10">
              <v-col cols="2" class="mt-2">
                <p align="center">입양신청번호</p></v-col
              >

              <v-col cols="auto">
                <v-text-field
                  v-model="requestNo"
                  outlined
                  dense
                  class="mt-2"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="2"> <p align="center">이름</p></v-col>
              <v-col cols="auto">
                <v-text-field v-model="name" outlined dense></v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="4">
          <v-card min-height="180" flat>
            <v-row justify="center" class="mt-10">
              <v-col cols="auto" class="mt-15">
                <v-btn
                  color="yellow"
                  depressed
                  large
                  @click="getAppByKakao"
                  v-if="hasCookie"
                  >카카오로 조회 <v-icon>mdi-chat</v-icon>
                </v-btn>
                <v-btn
                  color="orange"
                  class="white--text"
                  depressed
                  large
                  @click="getAppByKakao"
                  v-else
                  >내 입양신청서 보기 <v-icon>mdi-paw</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row justify="center">
        <v-btn
          color="orange"
          class="white--text mt-2"
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
import cookie from "../plugins/cookie";

export default {
  name: "done",
  data: () => ({
    requestNo: null,
    name: "",
  }),
  mounted() {
    if (cookie.getSession() != undefined) {
      this.$store.dispatch("profile/setProfile");
    }
  },
  computed: {
    hasCookie() {
      if (cookie.getSession() == undefined) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    async getApplication() {
      const requestNo = this.requestNo;
      const name = this.name;
      try {
        const result = await request.get(requestNo, name);

        if (result.status == 200) {
          const id = result.data[0].animalId;

          this.$router.push({
            name: "appDetails",
            params: { id, requestNo, name },
          });
        }
      } catch (e) {
        alert("입양신청번호와 이름을 확인하세요.");
      }
    },
    async getAppByKakao() {
      if (!cookie.getSession()) {
        window.location.href = process.env.VUE_APP_LOGIN_URL;
      } else {
        const email = this.$store.state.profile.data.email;

        try {
          const result = await request.email(email);

          if (result.status == 200) {
            const id = result.data[0].animalId;
            const requestNo = result.data[0].requestNo;
            const name = result.data[0].name;

            this.$router.push({
              name: "appDetails",
              params: { id, requestNo, name },
            });
          }
        } catch (e) {
          alert("입양신청서 정보가 없습니다.");
        }
      }
    },
  },
};
</script>
