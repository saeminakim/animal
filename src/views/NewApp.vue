<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card flat outlined>
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
        <v-card class="mx-auto my-12" max-width="80%" flat>
          <v-img :src="animal.popfile"></v-img>
          <v-card-title>{{ animal.noticeNo }}</v-card-title>
          <v-form>
            <v-card-text>1. 이름</v-card-text>
            <v-text-field
              v-model="application.name"
              required
              outlined
              dense
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
              <v-btn color="success" class="mr-4" @click="createApplication">
                신청
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
  }),
  mounted() {
    this.getAnimal();
  },

  methods: {
    async getAnimal() {
      const id = this.$route.params.id;
      const result = await api.details(id);
      console.log(result.data);
      if (result.status == 200) {
        this.animal = result.data;
      }
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
        animalId: this.animal.id,
        noticeNo: this.animal.noticeNo,
        status: "진행중",
        requestNo: "",
        animalImg: this.animal.popfile,
      };

      const result = await request.post(application);
      console.log(result);
      const requestNo = result.data.requestNo;
      console.log(requestNo);

      this.$router.push({ name: "applied", params: { requestNo } });
    },

    // getRefNo() {
    //   // 신청서 레퍼런스를 어떻게 만들것인가..........
    //   // 8자리 : 신청연도 (4자리) + 증가하는 숫자(4자리)
    //   // ex) 20210001
    //   // let rawNumber = 1;
    //   let number = this.rawNumber.toLocaleString("en-US", {
    //     minimumIntegerDigits: 4,
    //     useGrouping: false,
    //   });

    //   const date = new Date();
    //   const year = date.getFullYear();

    //   console.log("저장 전 : " + year + number);

    //   this.application.requestNo = year + number;

    //   this.rawNumber += 1;

    //   console.log("저장 후 : " + this.rawNumber);
    // },
  },
};
</script>
