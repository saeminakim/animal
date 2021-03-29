<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="mx-auto my-12" width="90%" flat outlined>
          <v-row>
            <v-card-title class="headline mb-1">
              {{ animal.noticeNo }}
            </v-card-title>
          </v-row>
          <v-card-text>
            <v-container>
              <v-list>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      신청번호 : {{ application.requestNo }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      신청상태 : {{ application.status }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      이름 : {{ application.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      연락처 : {{ application.mobile }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      이메일주소 : {{ application.email }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      성별 : {{ application.gender }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      집주소 : {{ application.address }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      직업 : {{ application.job }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      가족구성원 : {{ application.familyMember }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      가족 동의 여부 : {{ application.familyAgreed }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      반려동물 유무 : {{ application.petAtHome }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      반려동물 소개 : {{ application.petDetails }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      주거형태 : {{ application.houseType }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      입양희망이유 : {{ application.reason }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-container>
          </v-card-text>
          <v-row justify="center">
            <v-btn class="ma-2" depressed @click="editApp(application.id)"
              >수정</v-btn
            >
            <v-btn
              class="ma-2"
              depressed
              color="error"
              @click="cancel(application.id)"
              >취소요청</v-btn
            >
          </v-row>
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
    this.getAnimal();
    this.getApp();
  },
  methods: {
    async getAnimal() {
      const id = this.$route.params.id;
      const result = await api.details(id);
      if (result.status == 200) {
        this.animal = result.data;
      }
    },

    async getApp() {
      const requestNo = this.$route.params.requestNo;
      const name = this.$route.params.name;
      const result = await request.get(requestNo, name);
      if (result.status == 200) {
        this.application = result.data[0];
      }
    },

    editApp(id) {
      this.$router.push({ name: "editApp", params: { id } });
    },

    cancel(id) {
      this.$router.push({ name: "cancel", params: { id } });
    },
  },
};
</script>
