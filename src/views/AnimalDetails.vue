<template>
  <div>
    <menu-tabs></menu-tabs>
    <v-container>
      <v-row>
        <v-col :cols="4">
          <v-card class="mx-auto my-12" max-width="80%">
            <v-img height="300" :src="$route.params.popfile"></v-img>

            <v-card-title>입양 가능 상태</v-card-title>

            <v-card-text>
              <v-container>
                <v-row align="center" class="mx-0">
                  <v-col sm="6">
                    <v-card class="pa-2" flat>
                      {{ $route.params.kindCd }}
                    </v-card>
                  </v-col>
                  <v-col sm="6">
                    <v-card class="pa-2" flat>
                      {{ $route.params.sexCd }}
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col sm="6">
                    <v-card class="pa-2" flat>
                      {{ $route.params.orgNm }}
                    </v-card>
                  </v-col>
                  <v-col sm="6">
                    <v-card class="pa-2" flat>
                      {{ $route.params.happenDt }}
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("----$route.params----");
    // console.log(item);
  },
  props: ["item"],
};
</script>