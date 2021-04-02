<template>
  <div>
    <menu-tabs></menu-tabs>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="mx-auto my-12" max-width="80%" flat>
            <v-img :src="lists.popfile" alt="유기동물 사진"></v-img>
            <v-row>
              <v-col>
                <v-card-title class="headline mb-1">{{
                  lists.kindCd
                }}</v-card-title>
              </v-col>
              <v-col>
                <v-btn
                  depressed
                  absolute
                  right
                  x-large
                  color="#C7AD7F"
                  @click="applyAdoption(lists.id)"
                  >입양신청<v-icon>mdi-paw</v-icon></v-btn
                >
              </v-col>
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
                        {{ lists.sexCd }}/{{ lists.age }}/{{ lists.weight }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        공고번호: {{ lists.noticeNo }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        지역: {{ lists.orgNm }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        발견장소: {{ lists.happenPlace }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        공고기한: {{ lists.noticeSdt }} - {{ lists.noticeEdt }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        보호센터: {{ lists.careNm }}<br />
                        (전화번호 :
                        {{ lists.careTel }})
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        담당자: {{ lists.chargeNm }}<br />
                        (전화번호 :{{ lists.officetel }})
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="#C7AD7F"> mdi-paw </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        특징: {{ lists.specialMark }}
                      </v-list-item-title>
                    </v-list-item-content>
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
  </div>
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
  methods: {
    async getDetails() {
      let id = this.$route.params.id;
      const result = await api.details(id);
      console.log("----result.data----");
      console.log(result.data);
      if (result.status == 200) {
        this.lists = result.data;
      }
    },
    applyAdoption(id) {
      console.log("----입양신청 버튼 클릭시 id----");
      console.log(id);
      this.$router.push({ name: "apply", params: { id } });
    },
    backToList() {
      return this.$router.go(-1);
    },
  },
};
</script>