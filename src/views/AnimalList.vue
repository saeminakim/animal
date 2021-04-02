<template>
  <v-container>
    <menu-tabs></menu-tabs>
    <!-- 필터 UI -->
    <div>
      <v-row justify="center">
        <v-col cols="auto">
          <v-select
            :items="filterOptions.options.opt_sido"
            v-model="filterOptions.support.area_sido"
            label="시도"
            dense
            outlined
            class="ma-2"
          ></v-select>
        </v-col>
        <!-- <v-col cols="2">
          <v-select
            :items="filteredAreaData"
            v-model="filterOptions.items.area_id"
            label="구군"
            dense
            outlined
            class="ma-2"
          ></v-select>
        </v-col> -->
        <v-col cols="auto">
          <v-select
            v-model="filterOptions.support.animal_type"
            :items="filterOptions.options.opt_type"
            label="축종"
            dense
            outlined
            class="ma-2"
          ></v-select>
        </v-col>
        <!-- <v-col cols="2">
          <v-select
            :items="filteredKindData"
            v-model="filterOptions.items.animal_id"
            label="상세 품종"
            dense
            outlined
            class="ma-2"
          ></v-select>
        </v-col> -->
        <v-col cols="auto">
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
          @click="seeDetails(item.id)"
        >
          <v-img height="300" :src="item.popfile" alt="유기동물 사진"></v-img>

          <v-card-title>{{ item.processState }}</v-card-title>

          <v-card-text>
            <v-container>
              <v-row align="center" class="mx-0">
                <v-col sm="6">
                  <v-card flat> {{ item.kindCd }} </v-card>
                </v-col>
                <v-col sm="6">
                  <v-card flat> {{ item.sexCd }} </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="6">
                  <v-card flat> {{ item.orgNm }} </v-card>
                </v-col>
                <v-col sm="6">
                  <v-card flat> {{ item.happenDt }} </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      v-model="page"
      class="my-4"
      :length="totalPages"
      :total-visible="10"
      @input="handlePageChange"
    ></v-pagination>
  </v-container>
</template>
<style scoped>
.v-pagination {
  color: none;
  border-color: none;
}
</style>

<script>
import filterOptions from "../assets/js/DataForFilter";
import api from "../api/animal";

export default {
  data: () => ({
    filterOptions,
    lists: [],
    totalPages: 0,
    page: 0,
    sido: "",
    sidoCode: 0,
    type: "",
    typeCode: 0,
    status: "",
  }),

  mounted() {
    this.getList();
  },

  methods: {
    async getList() {
      console.log("현재 목록 상태 : " + this.$store.state.currentList);

      // 전체 목록보기 상태일 때
      if (this.$store.state.currentList == "전체") {
        try {
          const result = await api.list(this.page);

          console.log(result.data);

          if (result.status == 200) {
            this.lists = result.data.content;
            this.page = result.data.number + 1;
            this.totalPages = result.data.totalPages;
          }
        } catch (e) {
          alert("검색 결과가 없습니다.");
        }
      }

      // 필터 적용된 목록보기일 때
      else if (this.$store.state.currentList == "필터") {
        console.log("필터된 리스트");
        console.log(arguments);
        this.page = arguments[3];

        // 시도 널 널
        if (arguments[0] != "" && arguments[1] == "" && arguments[2] == "") {
          console.log("시도 널 널");
          try {
            const result = await api.sido(this.sido, this.page);
            console.log(result);

            if (result.status == 200) {
              this.lists = result.data.content;
              this.page = result.data.number + 1;
              this.totalPages = result.data.totalPages;
            }
          } catch (e) {
            alert("검색 결과가 없습니다.");
          }
        }

        // 시도 축종 널
        else if (
          arguments[0] != "" &&
          arguments[1] != "" &&
          arguments[2] == ""
        ) {
          console.log("시도 축종 널");
          try {
            const result = await api.sidoType(this.sido, this.type, this.page);

            console.log(result);

            if (result.status == 200) {
              this.lists = result.data.content;
              this.totalPages = result.data.totalPages;
            }
          } catch (e) {
            alert("검색 결과가 없습니다.");
          }
        }

        // 시도 축종 상태
        else if (
          arguments[0] != "" &&
          arguments[1] != "" &&
          arguments[2] != ""
        ) {
          console.log("시도 축종 상태");
          try {
            const result = await api.sidoTypeStatus(
              this.sido,
              this.type,
              this.status,
              this.page
            );

            console.log(result);

            if (result.status == 200) {
              this.lists = result.data.content;
              this.totalPages = result.data.totalPages;
            }
          } catch (e) {
            alert("검색 결과가 없습니다.");
          }
        }

        // 널 축종 널
        else if (
          arguments[0] == "" &&
          arguments[1] != "" &&
          arguments[2] == ""
        ) {
          console.log("널 축종 널");
          try {
            const result = await api.type(this.type, this.page);
            console.log(result);

            if (result.status == 200) {
              this.lists = result.data.content;
              this.totalPages = result.data.totalPages;
            }
          } catch (e) {
            alert("검색 결과가 없습니다.");
          }
        }

        // 널 축종 상태
        else if (
          arguments[0] == "" &&
          arguments[1] != "" &&
          arguments[2] != ""
        ) {
          console.log("널 축종 상태");
          try {
            const result = await api.typeStatus(
              this.type,
              this.status,
              this.page
            );
            console.log(result);

            if (result.status == 200) {
              this.lists = result.data.content;
              this.totalPages = result.data.totalPages;
            }
          } catch (e) {
            alert("검색 결과가 없습니다.");
          }
        }

        // 시도 널 상태
        else if (
          arguments[0] != "" &&
          arguments[1] == "" &&
          arguments[2] != ""
        ) {
          console.log("시도 널 상태");
          try {
            const result = await api.sidoStatus(
              this.sido,
              this.status,
              this.page
            );
            console.log(result);

            if (result.status == 200) {
              this.lists = result.data.content;
              this.totalPages = result.data.totalPages;
            }
          } catch (e) {
            alert("검색 결과가 없습니다.");
          }
        }
        // 널 널 상태
        else if (
          arguments[0] == "" &&
          arguments[1] == "" &&
          arguments[2] != ""
        ) {
          console.log("널 널 상태");
          try {
            const result = await api.status(this.status, this.page);
            console.log(result);

            if (result.status == 200) {
              this.lists = result.data.content;
              this.totalPages = result.data.totalPages;
            }
          } catch (e) {
            alert("검색 결과가 없습니다.");
          }
        }
      }
    },

    async handlePageChange(value) {
      this.page = value - 1;

      this.getList(this.sido, this.type, this.status, this.page);
    },

    seeDetails(id) {
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
      this.$store.state.currentList = "필터";

      this.sidoCode = this.filterOptions.support.area_sido;
      this.typeCode = this.filterOptions.support.animal_type;
      this.status = this.filterOptions.support.status;

      console.log("this.status");
      console.log(this.status);

      if (this.sidoCode != "" && this.typeCode == "") {
        this.getSido();
        console.log("시도 :" + this.sido);
      } else if (this.sidoCode != "" && this.typeCode != "") {
        this.getSido();
        console.log("시도 :" + this.sido);
        this.getType();
        console.log("축종 : " + this.type);
      } else if (this.sidoCode == "" && this.typeCode != "") {
        this.getType();
        console.log("축종 : " + this.type);
      } else {
        console.log("상태 : " + this.status);
      }

      this.getList(this.sido, this.type, this.status, this.page);
    },
  },
};
</script>