<template>
  <v-container class="mx-auto" :id="inhalt">
    <v-row>
      <v-col xs12 sm6 class="d-flex justify-center">
        <v-btn large to="/meetups" class="info mx-2">Explore Meetups</v-btn>
        <v-btn large to="/meetup/new" class="info mx-2">Organize Meetups</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-carousel>
          <v-carousel-item v-for="(item,i) in meetups" :key="i" :src="item.imageURL"
          @click="onLoadMeetup(item.id)" style="cursor: pointer">
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
  components: {

  },
  props:['inhalt'],
  data:() =>({
    meetups:[
      {imageURL:require("@/assets/ensiferum.jpg"), id: 1, title: 'meetup in New York'}
      ]
}),
  methods: {
    onLoadMeetup(id){
      this.$router.push('/meetups/'+id)
    }
  }
}
</script>
