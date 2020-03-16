<template>
  <v-container class="mx-auto">
    <v-row v-if="user">
      <v-row>
      <v-col xs12 sm6 class="d-flex justify-center">
        <v-btn large to="/meetups" class="info mx-2">Explore Meetups</v-btn>
        <v-btn large to="/newmeetup" class="info mx-2">Organize Meetups</v-btn>
      </v-col>
    </v-row>
      <v-col>
        <v-carousel>
          <v-carousel-item v-for="(item,i) in meetups" :key="i" :src="item.imgsrc"
          @click="onLoadMeetup(item.id)" style="cursor: pointer">
            <v-overlay absolute :value="item" class="pa-10">{{item}}</v-overlay>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" class="d-flex justify-center">
        <v-alert align="center" width="30%" class="pa-2 info headline" prominent icon="mdi-account" border="left" elevation="12" >
          <span class="title">Please Sign In!<br></span>
        <v-btn class="ma-1">Sign Up</v-btn>
        <v-btn class="ma-1">Sign In</v-btn></v-alert>
      </v-col>
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
    }
  }
}
</script>
