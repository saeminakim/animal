<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card flat>
          <v-card-title>입양신청서 수정</v-card-title>
          <v-card-text>
            <p>수정 수정</p>
          </v-card-text>
        </v-card>
        <v-spacer></v-spacer>
      </v-col>
    </v-row>
    <v-row justify="center">
      <!-- 입양신청서 폼 -->
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card flat>
          <v-img :src="animal.popfile"></v-img>
          <v-card-title>{{ animal.noticeNo }}</v-card-title>
          <v-form>
            <v-card-text>1. 이름 (수정 불가)</v-card-text>
            <v-text-field
              v-model="application.name"
              required
              outlined
              dense
              disabled
            ></v-text-field>

            <v-card-text>2. 연락처</v-card-text>
            <v-text-field
              v-model="application.mobile"
              required
              outlined
              dense
            ></v-text-field>

            <v-card-text>3. 이메일주소</v-card-text>
            <v-text-field
              v-model="application.email"
              required
              outlined
              dense
            ></v-text-field>

            <v-card-text>4. 성별</v-card-text>
            <v-radio-group v-model="application.gender">
              <v-radio label="남성" value="남성"></v-radio>
              <v-radio label="여성" value="여성"></v-radio>
            </v-radio-group>

            <v-card-text>5. 주소</v-card-text>
            <v-text-field
              v-model="application.address"
              required
              outlined
              dense
            ></v-text-field>

            <v-card-text>6. 직업</v-card-text>
            <v-text-field
              v-model="application.job"
              required
              outlined
              dense
            ></v-text-field>

            <v-card-text
              >7. 가족구성원은 몇 명인가요? 가족을 소개해주세요.</v-card-text
            >
            <v-textarea
              v-model="application.familyMember"
              outlined
            ></v-textarea>

            <v-card-text>8. 모든 가족구성원이 입양에 동의했나요?</v-card-text>
            <v-radio-group v-model="application.familyAgreed">
              <v-radio label="네" value="동의"></v-radio>
              <v-radio label="아니오" value="비동의"></v-radio>
            </v-radio-group>

            <v-card-text>9. 키우고 계신 반려동물이 있나요?</v-card-text>
            <v-radio-group v-model="application.petAtHome">
              <v-radio label="네" value="Y"></v-radio>
              <v-radio label="아니오" value="N"></v-radio>
            </v-radio-group>

            <v-card-text>있다면 최대한 자세히 소개해주세요.</v-card-text>
            <v-textarea v-model="application.petDetails" outlined></v-textarea>

            <v-card-text>10. 주거 형태</v-card-text>
            <v-text-field
              v-model="application.houseType"
              required
              outlined
              dense
            ></v-text-field>

            <v-card-text>11. 입양을 희망하는 이유는 무엇인가요?</v-card-text>
            <v-textarea v-model="application.reason" outlined></v-textarea>

            <v-row justify="center">
              <v-btn
                color="success"
                class="mr-4"
                @click="sendEdit(application)"
              >
                수정
              </v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import api from "../api/animal";
import request from "../api/request";

export default {
  data: () => ({
    animal: [],
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
      }

      const animalId = this.application.animalId;

      this.getAnimal(animalId);
    },

    async getAnimal(animalId) {
      const result = await api.details(animalId);
      if (result.status == 200) {
        this.animal = result.data;
      }
    },

    async sendEdit(application) {
      const id = this.application.id;
      console.log("신청서id");
      console.log(id);
      const result = await request.edit(id, application);
      console.log("신청서 result");
      console.log(result.data);
      if (result.status == 200) {
        this.application = result.data;
      }

      this.$router.push("/edited");
    },
  },
};
</script>
