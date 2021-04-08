<template>
  <v-container>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="mx-auto my-12" max-width="80%" flat>
            <v-img :src="lists.popfile" alt="유기동물 사진"></v-img>
            <v-row>
              <v-col>
                <v-card-title class="headline mt-2">{{
                  lists.kindCd
                }}</v-card-title>
              </v-col>
              <v-col v-if="isApplied">
                <v-btn
                  depressed
                  absolute
                  right
                  x-large
                  color="orange"
                  class="ma-2 white--text"
                  @click="applyAdoption(lists.id)"
                  >입양신청<v-icon>mdi-paw</v-icon></v-btn
                >
              </v-col>
              <v-col cols="auto" v-else>
                <v-chip class="ma-2" large color="orange" text-color="white">
                  입양완료
                  <v-icon> mdi-paw </v-icon>
                </v-chip>
              </v-col>
            </v-row>
            <v-card-text>
              <v-container>
                <v-list>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="orange"> mdi-paw </v-icon>
                    </v-list-item-icon>
                    <v-card-text>
                      {{ lists.sexCd }}/{{ lists.age }}/{{ lists.weight }}
                    </v-card-text>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="orange"> mdi-paw </v-icon>
                    </v-list-item-icon>
                    <v-card-text> 공고번호: {{ lists.noticeNo }} </v-card-text>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="orange"> mdi-paw </v-icon>
                    </v-list-item-icon>
                    <v-card-text> 지역: {{ lists.orgNm }} </v-card-text>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="orange"> mdi-paw </v-icon>
                    </v-list-item-icon>
                    <v-card-text>
                      발견장소: {{ lists.happenPlace }}
                    </v-card-text>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="orange"> mdi-paw </v-icon>
                    </v-list-item-icon>
                    <v-card-text>
                      공고기한: {{ lists.noticeSdt }} - {{ lists.noticeEdt }}
                    </v-card-text>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="orange"> mdi-paw </v-icon>
                    </v-list-item-icon>
                    <v-card-text>
                      보호센터: {{ lists.careNm }}
                      (전화번호 :
                      {{ lists.careTel }})
                    </v-card-text>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="orange"> mdi-paw </v-icon>
                    </v-list-item-icon>
                    <v-card-text>
                      담당자: {{ lists.chargeNm }} (전화번호 :{{
                        lists.officetel
                      }})
                    </v-card-text>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="orange"> mdi-paw </v-icon>
                    </v-list-item-icon>
                    <v-card-text> 특징: {{ lists.specialMark }} </v-card-text>
                  </v-list-item>
                </v-list>
              </v-container>
            </v-card-text>
          </v-card>
          <v-row justify="center">
            <v-btn depressed @click="backToList">목록</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import api from "../api/animal";
export default {
  name: "animalDetails",
  data: () => ({
    lists: [],
  }),
  mounted() {
    this.getDetails();
  },
  computed: {
    isApplied() {
      const status = this.lists.processState;
      const adoption = "입양완료";

      if (status == undefined || status.includes(adoption)) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    async getDetails() {
      let id = this.$route.params.id;
      const result = await api.details(id);

      if (result.status == 200) {
        this.lists = result.data;
      }
    },
    applyAdoption(id) {
      this.$router.push({ name: "apply", params: { id } });
    },
    backToList() {
      return this.$router.go(-1);
    },
  },
};
</script>