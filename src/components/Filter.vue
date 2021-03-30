<template>
  <div>
    <v-row>
      <!-- <v-select
        :items="sido"
        v-model="sidos"
        label="시도"
        dense
        outlined
        class="ma-2"
      ></v-select> -->
      <!-- <v-select
        :items="filteredData"
        v-model="gugun"
        label="구군"
        dense
        outlined
        class="ma-2"
      ></v-select> -->
      <!-- <v-select
        v-model="type"
        :items="kind"
        label="축종"
        dense
        outlined
        class="ma-2"
      ></v-select> -->
      <v-select label="상세 품종" dense outlined class="ma-2"></v-select>
      <v-select label="상태" dense outlined class="ma-2"></v-select>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    // sido: "시도",
    // sidos: [
    //   { text: "서울특별시", value: 1 },
    //   { text: "부산광역시", value: 2 },
    //   { text: "인천광역시", value: 3 },
    //   { text: "광주광역시", value: 4 },
    //   { text: "세종특별자치시", value: 5 },
    //   { text: "대전광역시", value: 6 },
    //   { text: "울산광역시", value: 7 },
    //   { text: "경기도", value: 8 },
    //   { text: "강원도", value: 9 },
    //   { text: "충청북도", value: 10 },
    //   { text: "충청남도", value: 11 },
    //   { text: "전라북도", value: 12 },
    //   { text: "전라남도", value: 13 },
    //   { text: "경상북도", value: 14 },
    //   { text: "경상남도", value: 15 },
    //   { text: "제주특별자치도", value: 16 },
    // ],
    // gugun: "구군",
    // guguns: [
    //   { text: "강남구", value: 1, dependency: 1 },
    //   { text: "강동구", value: 2, dependency: 1 },
    //   { text: "강북구", value: 3, dependency: 1 },
    //   { text: "강서구", value: 4, dependency: 1 },
    //   { text: "관악구", value: 5, dependency: 1 },
    //   { text: "광진구", value: 6, dependency: 1 },
    //   { text: "구로구", value: 7, dependency: 1 },
    //   { text: "금천구", value: 8, dependency: 1 },
    //   { text: "노원구", value: 9, dependency: 1 },
    //   { text: "도봉구", value: 10, dependency: 1 },
    //   { text: "동대문구", value: 11, dependency: 1 },
    //   { text: "동작구", value: 12, dependency: 1 },
    //   { text: "테스트", value: 13, dependency: 2 },
    // ],
    // type: "축종",
    // kind: ["개", "고양이", "기타축종"],
  }),
};
</script>
