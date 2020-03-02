<template>
  <v-app>
    <v-app-bar app >
      <v-app-bar-nav-icon @click.native="sideNav = !sideNav" class="hidden-sm-and-up"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn flat class="hidden-xs-only"><v-icon left>mdi-account</v-icon>View Meetups</v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="sideNav">

      <v-list-item-tile>
        <v-list-item-action><v-icon>mdi-account</v-icon></v-list-item-action>
        <v-list-item-action-text>View Meetups</v-list-item-action-text>
      </v-list-item-tile>
    </v-navigation-drawer>
    <v-content>
      <h1>Home</h1>
    </v-content>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
  },

  data: () => ({
    sideNav: false,
  }),
};
</script>
