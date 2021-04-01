<template>
  <v-container>
    <menu-tabs></menu-tabs>
    <!-- 필터 UI -->
    <div>
      <v-row justify="center">
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
            :items="filteredKindData"
            v-model="filterOptions.items.animal_id"
            label="상세 품종"
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
          @click="seeDetails(item.id)"
        >
          <v-img height="300" :src="item.popfile"></v-img>

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

<script>
import filterOptions from "../assets/js/DataForFilter";
import api from "../api/animal";

export default {
  data: () => ({
    filterOptions,
    lists: [],
    totalPages: 0,
    page: 1,
    sido: "",
    sidoCode: 0,
    areaId: "",
    type: "",
    typeCode: 0,
    kindId: "",
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
  },

  methods: {
    async getList() {
      let page = 0;
      console.log("현재 목록 상태 : " + this.$store.state.currentList);
      if (this.$store.state.currentList == "전체") {
        const result = await api.list(page);

        console.log(result.data);

        if (result.status == 200) {
          this.lists = result.data.content;
          this.totalPages = result.data.totalPages;
        }
      } else if (this.$store.state.currentList == "필터") {
        console.log("필터된 리스트");
        console.log(arguments[0]);

        const result = await api.filteredList(arguments[0], page);
        console.log(result);

        if (result.status == 200) {
          this.lists = result.data.content;
          this.totalPages = result.data.totalPages;
        }
      }
    },

    async handlePageChange(value) {
      let page = value - 1;

      this.getList(page);

      // const result = await api.list(this.page);
      // if (result.status == 200) {
      //   this.lists = result.data.content;
      // }
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
      console.log("typeArray : " + typeArray);
      this.type = typeArray[0].text;
    },

    async filterData() {
      // 현재 리스트의 상태값을 "필터"로 변경
      this.$store.state.currentList = "필터";

      this.sidoCode = this.filterOptions.support.area_sido;
      this.areaId = this.filterOptions.items.area_id;
      this.typeCode = this.filterOptions.support.animal_type;
      this.kindId = this.filterOptions.items.animal_id;
      this.status = this.filterOptions.support.status;
      console.log(
        "시도 코드 : " +
          this.sidoCode +
          ", 구군 : " +
          this.areaId +
          ", 축종 : " +
          this.typeCode +
          ", 상세품종 : " +
          this.kindId +
          ", 상태 : " +
          this.status
      );

      // 시도만 선택했을 때
      if (this.sidoCode != "" && this.typeCode == "" && this.status == "") {
        this.getSido();
        // 시도/구군까지 선택했을 때
        if (this.areaId != null) {
          console.log("시도/구군까지 선택됨. 시도/구군 필터 메소드 실행");
          // this.getList(this.sido, this.areaId);
          // 시도만 선택했을 때
        } else {
          console.log("시도만 선택됨. 시도 필터 메소드 실행");
        }
      } // 축종만 선택했을 때
      else if (
        this.sidoCode == "" &&
        this.typeCode != "" &&
        this.status == ""
      ) {
        this.getType();

        // 축종/품종까지 선택했을 때
        if (this.kindId != null) {
          console.log("축종/품종까지 선택됨. 축종/품종 필터 메소드 실행");
        } else {
          console.log("축종만 선택됨. 축종 필터 메소드 실행");
        }
      } // 상태만 선택했을 때
      else if (
        this.sidoCode == "" &&
        this.typeCode == "" &&
        this.status != ""
      ) {
        console.log("상태만 선택됨. 상태 필터 메소드 실행");
      } // 시도 & 축종 선택
      else if (
        this.sidoCode != "" &&
        this.typeCode != "" &&
        this.status == ""
      ) {
        if (this.areaId == null && this.kindId == null) {
          console.log("시도/축종 선택됨. 시도/축종 필터 메소드 실행");
        } else if (this.areaId == null && this.kindId != null) {
          console.log("시도/축종/품종 선택");
        } else if (this.areaId != null && this.kindId == null) {
          console.log("시도/구군/축종 선택됨");
        } else {
          console.log(
            "시도/구군/축종/품종 선택됨. 시도/구군/축종/품종 필터 메소드 실행"
          );
        }
      } // 시도 & 상태 선택
      else if (
        this.sidoCode != "" &&
        this.typeCode == "" &&
        this.status != ""
      ) {
        if (this.areaId != null) {
          console.log("시도/구군/상태 선택됨. 시도/구군/상태 필터 메소드 실행");
        } else {
          console.log("시도/상태 선택됨. 시도/상태 필터 메소드 실행");
        }
      } // 축종 & 상태 선택
      else if (
        this.sidoCode == "" &&
        this.typeCode != "" &&
        this.status != ""
      ) {
        if (this.kindId != null) {
          console.log("축종/품종/상태 선택됨. 축종/품종/상태 필터 메소드 실행");
        } else {
          console.log("축종/상태 선택됨. 축종/상태 필터 메소드 실행");
        }
      } // 시도&축종&상태 선택
      else if (
        this.sidoCode != "" &&
        this.typeCode != "" &&
        this.status != ""
      ) {
        if (this.areaId == null && this.kindId == null) {
          console.log("시도/축종/상태 선택");
        } else if (this.areaId == null && this.kindId != null) {
          console.log("시도/축종/품종/상태 선택");
        } else if (this.areaId != null && this.kindId == null) {
          console.log("시도/구군/축종/상태 선택");
        } else {
          console.log("시도/구군/축종/품종/상태 선택");
        }
      }

      // console.log("시도 코드 : " + this.sido);
      // console.log("구군 : " + this.areaId);
      // console.log("축종 : " + this.type);
      // console.log("상세품종 : " + this.kindId);
      // console.log("상태 : " + this.status);

      // select의 값을 매개 변수로 넘겨주며 getList 호출
      // this.getList(this.sido, this.areaId, this.typeCode, this.kindId);
    },
  },
};
</script>