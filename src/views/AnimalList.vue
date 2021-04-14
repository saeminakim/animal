<template>
  <v-container>
    <menu-tabs></menu-tabs>
    <!-- 필터 UI -->
    <div>
      <v-row justify="center" class="mt-2">
        <v-col cols="2">
          <v-select
            :items="filterOptions.options.opt_sido"
            v-model="filterOptions.support.area_sido"
            label="시도"
            dense
            outlined
            class="ma-2"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-select
            :items="filteredAreaData"
            v-model="filterOptions.items.area_id"
            label="구군"
            dense
            outlined
            class="ma-2"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="filterOptions.support.animal_type"
            :items="filterOptions.options.opt_type"
            label="축종"
            dense
            outlined
            class="ma-2"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-select
            :items="filterOptions.options.opt_status"
            v-model="filterOptions.support.status"
            label="상태"
            dense
            outlined
            class="ma-2"
          ></v-select>
        </v-col>
        <v-col cols="auto">
          <v-btn class="ma-2" depressed text @click="filterData"
            ><v-icon>mdi-magnify</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </div>

    <!-- 동물 목록 -->
    <v-row>
      <v-col
        v-for="(item, i) in lists"
        :key="i"
        :item="item"
        :index="i"
        cols="12"
        sm="4"
      >
        <v-card
          flat
          outlined
          class="mx-auto my-12"
          max-width="450"
          min-height="500"
          @click="seeDetails(item.id)"
        >
          <v-img height="320" :src="item.popfile" alt="유기동물 사진"></v-img>

          <v-card-title>[{{ item.processState }}]</v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <v-container>
              <v-row align="center" class="mx-0">
                <v-col sm="6">
                  <v-card flat> {{ item.kindCd }} </v-card>
                </v-col>
                <v-col sm="4">
                  <v-card flat> {{ item.sexCd }} </v-card>
                </v-col>
              </v-row>
              <v-row align="center" class="mx-0">
                <v-col sm="6">
                  <v-card flat> {{ item.orgNm }} </v-card>
                </v-col>
                <v-col sm="4">
                  <v-card flat> {{ item.happenDt }} </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      v-model="value"
      class="my-4"
      :length="totalPages"
      :total-visible="10"
      @input="handlePageChange"
    ></v-pagination>
  </v-container>
</template>

<script>
import filterOptions from "../assets/js/DataForFilter";
import api from "../api/animal";

export default {
  data: () => ({
    filterOptions,
    currentList: "전체",
    lists: [],
    totalPages: 0,
    page: 0,
    value: 0,
    sido: "",
    sidoCode: 0,
    gugun: "",
    type: "",
    typeCode: 0,
    status: "",
  }),

  computed: {
    filteredAreaData() {
      let options = this.filterOptions.options.opt_gugun;
      return options.filter(
        (o) => o.dependency == this.filterOptions.support.area_sido
      );
    },
    filteredKindData() {
      let options = this.filterOptions.options.opt_kind;
      return options.filter(
        (o) => o.dependency == this.filterOptions.support.animal_type
      );
    },
  },

  mounted() {
    this.getList();
    this.value = 1;

    console.log("마운팅 되는건가?? ");
    console.log(this.$router.params);
  },

  methods: {
    async getList() {
      // 전체 목록보기 상태일 때
      if (this.currentList == "전체") {
        try {
          const result = await api.list(this.page);

          if (result.status == 200) {
            this.lists = result.data.content;
            this.page = result.data.number + 1;
            this.totalPages = result.data.totalPages;

            window.scrollTo(0, 0);
          }
        } catch (e) {
          alert("검색 결과가 없습니다.");
        }
      }

      // 필터 적용된 목록보기일 때
      else if (this.currentList == "필터") {
        try {
          // 시도 널 널 널
          if (
            arguments[0] != "" &&
            arguments[1] == null &&
            arguments[2] == "" &&
            arguments[3] == ""
          ) {
            const result = await api.sido(this.sido, this.page);

            if (result.status == 200) {
              this.saveData(result);
            }
          }
          // 시도 구군 널 널
          else if (
            arguments[0] != "" &&
            arguments[1] != null &&
            arguments[2] == "" &&
            arguments[3] == ""
          ) {
            const result = await api.sidoGugun(
              this.sido,
              this.gugun,
              this.page
            );
            if (result.status == 200) {
              this.saveData(result);
            }
          }

          // 시도 널 축종 널
          else if (
            arguments[0] != "" &&
            arguments[1] == null &&
            arguments[2] != "" &&
            arguments[3] == ""
          ) {
            const result = await api.sidoType(this.sido, this.type, this.page);
            if (result.status == 200) {
              this.saveData(result);
            }
          }

          // 시도 널 축종 널
          else if (
            arguments[0] != "" &&
            arguments[1] == null &&
            arguments[2] != "" &&
            arguments[3] == ""
          ) {
            const result = await api.sidoType(this.sido, this.type, this.page);

            if (result.status == 200) {
              this.saveData(result);
            }
          }

          // 시도 구군 축종 널
          else if (
            arguments[0] != "" &&
            arguments[1] != null &&
            arguments[2] != "" &&
            arguments[3] == ""
          ) {
            const result = await api.sidoGugunType(
              this.sido,
              this.gugun,
              this.type,
              this.page
            );

            if (result.status == 200) {
              this.saveData(result);
            }
          }

          // 시도 널 축종 상태
          else if (
            arguments[0] != "" &&
            arguments[1] == null &&
            arguments[2] != "" &&
            arguments[3] != ""
          ) {
            const result = await api.sidoTypeStatus(
              this.sido,
              this.type,
              this.status,
              this.page
            );

            if (result.status == 200) {
              this.saveData(result);
            }
          }
          // 시도 구군 축종 상태
          else if (
            arguments[0] != "" &&
            arguments[1] != null &&
            arguments[2] != "" &&
            arguments[3] != ""
          ) {
            const result = await api.sidoGugunTypeStatus(
              this.sido,
              this.gugun,
              this.type,
              this.status,
              this.page
            );

            if (result.status == 200) {
              this.saveData(result);
            }
          }

          // 널 널 축종 널
          else if (
            arguments[0] == "" &&
            arguments[1] == null &&
            arguments[2] != "" &&
            arguments[3] == ""
          ) {
            const result = await api.type(this.type, this.page);

            if (result.status == 200) {
              this.saveData(result);
            }
          }

          // 널 널 축종 상태
          else if (
            arguments[0] == "" &&
            arguments[1] == null &&
            arguments[2] != "" &&
            arguments[3] != ""
          ) {
            const result = await api.typeStatus(
              this.type,
              this.status,
              this.page
            );

            if (result.status == 200) {
              this.saveData(result);
            }
          }

          // 시도 널 널 상태
          else if (
            arguments[0] != "" &&
            arguments[1] == null &&
            arguments[2] == "" &&
            arguments[3] != ""
          ) {
            const result = await api.sidoStatus(
              this.sido,
              this.status,
              this.page
            );

            if (result.status == 200) {
              this.saveData(result);
            }
          }

          // 시도 구군 널 상태
          else if (
            arguments[0] != "" &&
            arguments[1] != null &&
            arguments[2] == "" &&
            arguments[3] != ""
          ) {
            const result = await api.sidoGugunStatus(
              this.sido,
              this.gugun,
              this.status,
              this.page
            );

            if (result.status == 200) {
              this.saveData(result);
            }
          }

          // 널 널 널 상태
          else if (
            arguments[0] == "" &&
            arguments[1] == null &&
            arguments[2] == "" &&
            arguments[3] != ""
          ) {
            const result = await api.status(this.status, this.page);

            if (result.status == 200) {
              this.saveData(result);
            }
          }
        } catch (e) {
          alert("검색 결과가 없습니다.");
        }
      }
    },

    saveData(result) {
      this.lists = result.data.content;
      this.page = result.data.number + 1;
      this.totalPages = result.data.totalPages;
      window.scrollTo(0, 0);
    },

    async handlePageChange(value) {
      this.value = value;
      this.page = value - 1;

      this.getList(this.sido, this.gugun, this.type, this.status, this.page);

      // 페이지 테두리 blur
      const btnList = document.querySelectorAll(".v-pagination button");
      for (let btn of btnList) {
        btn.blur();
      }
    },

    seeDetails(id) {
      console.log("-----this.page-----");
      console.log(this.page);
      console.log("-----this.value-----");
      console.log(this.value);

      this.$router.push({ name: "animalDetails", params: { id } });
    },

    getSido() {
      const optSido = this.filterOptions.options.opt_sido;
      const sidoArray = optSido.filter((o) => o.value == this.sidoCode);
      this.sido = sidoArray[0].text;
    },

    getType() {
      const optType = this.filterOptions.options.opt_type;
      const typeArray = optType.filter((o) => o.value == this.typeCode);
      this.type = typeArray[0].text;
    },

    async filterData() {
      // 현재 리스트의 상태값을 "필터"로 변경
      this.currentList = "필터";

      this.sidoCode = this.filterOptions.support.area_sido;
      this.gugun = this.filterOptions.items.area_id;
      this.typeCode = this.filterOptions.support.animal_type;
      this.status = this.filterOptions.support.status;

      if (this.sidoCode != "" && this.typeCode == "") {
        this.getSido();
      } else if (this.sidoCode != "" && this.typeCode != "") {
        this.getSido();
        this.getType();
      } else if (this.sidoCode == "" && this.typeCode != "") {
        this.getType();
      }
      this.page = 0;
      this.value = 1;
      this.getList(this.sido, this.gugun, this.type, this.status, this.page);
    },
  },
};
</script>