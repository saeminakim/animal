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
            label="상태"
            dense
            outlined
            class="ma-2"
          ></v-select>
        </v-col>
        <v-col cols="auto">
          <v-btn class="ma-2" depressed text @click="filterData()"
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
import filterOptions from "../data/DataForFilter";
import api from "../api/animal";

export default {
  data: () => ({
    filterOptions,
    lists: [],
    totalPages: 0,
    page: 1,
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
  // actions
  methods: {
    async getList() {
      let page = 0;

      const result = await api.list(page);

      console.log(result.data);

      if (result.status == 200) {
        this.lists = result.data.content;
        this.totalPages = result.data.totalPages;
      }
    },

    async handlePageChange(value) {
      let page = value - 1;

      const result = await api.list(page);
      if (result.status == 200) {
        this.lists = result.data.content;
      }
    },

    seeDetails(id) {
      this.$router.push({ name: "animalDetails", params: { id } });
    },

    async filterData() {
      const sidoCode = this.filterOptions.support.area_sido;
      const areaId = this.filterOptions.items.area_id;
      console.log("시도 코드 : " + sidoCode + " 구군 : " + areaId);
      console.log("--------------------------------------------");

      const typeCode = this.filterOptions.support.animal_type;
      const kindId = this.filterOptions.items.animal_id;
      console.log("축종 : " + typeCode + " 품종 : " + kindId);
      console.log("--------------------------------------------");

      const optSido = this.filterOptions.options.opt_sido;
      console.log(optSido);
      const sidoArray = optSido.filter((o) => o.value == sidoCode);
      const sido = sidoArray[0].text;

      console.log(sido);
      console.log("filteredData 실행");
      let page = 0;

      const result = await api.sido(sido, page);
      console.log(result);

      if (result.status == 200) {
        this.lists = result.data.content;
        this.totalPages = result.data.totalPages;
      }
    },
  },
};
</script>