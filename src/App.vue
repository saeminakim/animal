<template>
  <v-app>
    <v-tool-bar
      app
      color="#C7AD7F"
      class="ml-0"
      height="270px"
    >
      <!-- <div class="d-flex align-center ma-0"> -->
        <img
          alt="background"
          contain
          src="./assets/header.jpg"
        />
      <!-- </div> -->

      <!-- <v-spacer></v-spacer> -->
        <!-- <span class="mr-2">관리자</span>
        <v-icon>mdi-open-in-new</v-icon> -->
    </v-tool-bar>

    <v-main>
      <v-row justify="center">

        <v-btn value="left"
        v-for="(item, i) in items" :key="i" @click="navigateTo(item)" 
          width="250px"
          height="70px"
          size="50px"

          >
          <h2 v-text="item.text">

          </h2>
        </v-btn>


      </v-row>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

 

  data: () => ({
    //
    drawer: false, // drawer의 기본 값
      selectedItem: 0,
     items: [
        /* https://cdn.materialdesignicons.com/5.4.55/ */
        { text: '유기동물', icon: 'mdi-home', path: '/' },
        { text: '분실/보호동물', icon: 'mdi-contacts', path: '/LostAndFoundAnimal' },
        { text: '입양후기', icon: 'mdi-forum', path: '/ReviewMain' },
        { text: '신청내역조회', icon: 'mdi-format-list-checks', path: '/request' },
        { text: '관리자', icon: 'mdi-format-list-checks', path: '/manager' },

      ],
  }),

  methods:{
    navigateTo(item) {
        /* https://router.vuejs.org/kr/guide/essentials/navigation.html */
        // 현재 경로와 다르면
        if(this.$route.path != item.path){
          // 라우터에 경로 추가
          this.$router.push(item.path);
        }
     }
  },

};
</script>