<template>
  <v-container>
    <menu-tabs></menu-tabs>
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
          class="mx-auto my-12"
          max-width="374"
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
import api from "../api/animal";

export default {
  data: () => ({
    lists: [],
    totalPages: 0,
    page: 1,
  }),
  mounted() {
    this.getList();
  },
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
  },
};
</script>