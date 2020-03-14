<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col xs12 sm6 class="d-flex justify-center">
        <v-btn large to="/meetups" class="info mx-2">Explore Meetups</v-btn>
        <v-btn large to="/meetup/new" class="info mx-2">Organize Meetups</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-carousel>
          <v-carousel-item v-for="(item,i) in meetups" :key="i" :src="item.imgsrc"
          @click="onLoadMeetup(item.id)" style="cursor: pointer">
            <v-overlay absolute :value="item" class="pa-10">{{item}}</v-overlay>
          </v-carousel-item>
        </v-carousel>
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
    }
  }
}
</script>
