<template>
  <v-app>
    <v-app-bar app >
      <v-app-bar-nav-icon @click.native="sideNav = !sideNav" class="hidden-sm-and-down"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn text class="hidden-xs-only" @click="showMeetups = !showMeetups"><v-icon left>mdi-account</v-icon>View Meetups</v-btn>
      <v-spacer></v-spacer>
    </v-app-bar>

    <navigation-drawer :visible="sideNav" v-on:settings="settings = !settings"  />

    <v-content class="ma-4">
      <h1>Home</h1>
      <span id="settingsalert" v-if="settings"><v-alert color="error" border="left" colored-border elevation="1">Edit Settings</v-alert> </span>
      <span v-if="showMeetups"><v-alert color="success" border="left" colored-border elevation="10">Upcoming Meetups</v-alert> </span>
      <app-home v-for="n in 3" :key="n" :inhalt="'Inhalt'+n"></app-home>
      <app-home inhalt="Settings"></app-home>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from "@/components/NavigationDrawer"
import appHome from "@/views/Home"

export default {
  name: 'App',

  components: {
    NavigationDrawer,
    appHome
  },

  data: () => ({
    sideNav: false,
    settings:true,
    showMeetups: false
  }),
};
</script>
