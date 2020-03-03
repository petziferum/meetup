<template>
  <div class="home" :id="inhalt">
    <v-card class="ma-2" height="700px" max-width="300px" dark>
    <img alt="Vue logo" src="../assets/logo.png">
    <v-card-title >{{inhalt}}</v-card-title>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {

  },
  props:['inhalt']
}
</script>
