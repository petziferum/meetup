<template>
  <v-app>
    <v-app-bar app >
      <v-app-bar-nav-icon @click.native="sideNav = !sideNav" class="hidden-sm-and-down"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn text class="hidden-xs-only""><v-icon left>mdi-account</v-icon>View Meetups</v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="sideNav">
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
