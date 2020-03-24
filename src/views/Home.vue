<template>
  <v-container class="pa-2 ma-2 d-flex justify-center">
    <v-row  v-if="loading">
      <v-col cols="12" class="d-flex justify-center">
        <div class="d-flex pa-2">
        <v-skeleton-loader type="button" class="pa-2"></v-skeleton-loader>
        <v-skeleton-loader type="button" class="pa-2"></v-skeleton-loader>
        </div>
      </v-col>
      <v-col>
        <v-skeleton-loader type="image" tile></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else >
      <v-row v-if="!user && !loading" class="d-flex justify-center">
      <v-col cols="12" md="6" lg="6" style="border: 1px solid">
        <v-alert align="center" width="100%" class="pa-2 pl-6 info" prominent info icon="mdi-account" border="left" elevation="12" >
          <span class="headline text-left">Please Sign In!<br></span>
          <v-btn class="ma-1" to="/signup">Sign Up</v-btn>
          <v-btn class="ma-1" to="/signin">Sign In</v-btn></v-alert>
      </v-col>
    </v-row>

    <v-row v-else-if="user && !loading">
      <v-col cols="12" class="d-flex justify-center">
        <v-btn tile to="/meetups" class="info mx-2">Explore Meetups</v-btn>
        <v-btn tile to="/newmeetup" class="info mx-2">Organize Meetups</v-btn>
      </v-col>
      <v-col cols="12" md="12" lg="12">
        <v-carousel style="border:1px solid">
          <v-carousel-item
                  v-for="(item,i) in meetups"
                  :key="i"
                  @click="onLoadMeetup(item.id)"
                  style="cursor: pointer">
            <v-img :src="item.imgsrc" aspect-ratio="2" height="100%" max-width="100%" cover></v-img>
            <v-overlay absolute :value="item" class="pa-10">{{item}}</v-overlay>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
      <!--<v-row v-else-if="!user && !loading">
        <v-col cols="12" class="d-flex justify-center">
          <v-alert align="center" width="30%" class="pa-2 info headline" prominent icon="mdi-account" border="left" elevation="12" >
            <span class="title">Please Sign In!<br></span>
            <v-btn class="ma-1">Sign Up</v-btn>
            <v-btn class="ma-1" to="/signin">Sign In</v-btn></v-alert>
        </v-col>
      </v-row>//-->
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  data:() =>({

}),
  methods: {
    onLoadMeetup(id){
      this.$router.push('/meetup/'+id)
    }
  },
  computed:{
    meetups() {
      return this.$store.getters.feturedMeetups
    },
    user () {
      return this.$store.getters.user
    },
    loading() {
      return this.$store.getters.loading
    }
  }
}
</script>
