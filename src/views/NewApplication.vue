<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card flat>
          <v-card-title>입양 신청</v-card-title>
          <v-card-text>
            <p>상처받은 아이들의 소중한 가족이 되어주세요.</p>
            <p>입양신청서가 접수되면 심사에 2-3일 정도 소요됩니다.</p>
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
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-text>1. 이름</v-card-text>
            <v-text-field
              v-model="application.name"
              label="이름"
              required
              outlined
              dense
            ></v-text-field>

            <v-card-text>2. 연락처</v-card-text>
            <v-text-field
              v-model="application.mobile"
              label="연락처"
              required
              outlined
              dense
            ></v-text-field>

            <v-card-text>3. 이메일주소</v-card-text>
            <v-text-field
              v-model="application.email"
              label="이메일"
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
              label="주소"
              required
              outlined
              dense
            ></v-text-field>

            <v-card-text>6. 직업</v-card-text>
            <v-text-field
              v-model="application.job"
              label="직업"
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
              label="주거 형태"
              required
              outlined
              dense
            ></v-text-field>

            <v-card-text>11. 입양을 희망하는 이유는 무엇인가요?</v-card-text>
            <v-textarea v-model="application.reason" outlined></v-textarea>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="createApplication"
            >
              신청
            </v-btn>

            <v-btn color="error" class="mr-4" @click="reset">
              Reset Form
            </v-btn>

            <v-btn color="warning" @click="resetValidation">
              Reset Validation
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import api from "../api/animal";
import apply from "../api/request";

export default {
  data: () => ({
    animal: [],
    application: {
      name: "",
      mobile: "",
      email: "",
      gender: "",
      address: "",
      job: "",
      familyMember: "",
      familyAgreed: "",
      petAtHome: "",
      petDetails: "",
      houseType: "",
      reason: "",
      status: "",
    },
    valid: true,

    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),
  mounted() {
    this.getNoticeNo();
  },

  methods: {
    async getNoticeNo() {
      let id = this.$route.params.id;
      const result = await api.details(id);
      console.log(result.data);
      if (result.status == 200) {
        this.animal = result.data;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    async createApplication() {
      const application = {
        name: this.application.name,
        mobile: this.application.mobile,
        email: this.application.email,
        gender: this.application.gender,
        address: this.application.address,
        job: this.application.job,
        familyMember: this.application.familyMember,
        familyAgreed: this.application.familyAgreed,
        petAtHome: this.application.petAtHome,
        petDetails: this.application.petDetails,
        houseType: this.application.houseType,
        reason: this.application.reason,
        status: this.application.status,
        animalId: this.animal.id,
        noticeNo: this.animal.noticeNo,
      };

      const result = await apply.post(application);
      console.log(result);

      this.$router.push("/applied");
    },

    // getRefNo() {
    // 신청서 레퍼런스를 어떻게 만들것인가..........
    // 8자리 : 신청연도 (4자리) + 증가하는 숫자(4자리)
    // ex) 20210001
    // }
  },
};
</script>
