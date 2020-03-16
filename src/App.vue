<template>
  <v-app>
    <v-app-bar app clipped-left>

      <v-app-bar-nav-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title class="header" style="cursor:pointer" tag="span"><router-link to="/" tag="span"> Stammtisch APP</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-for="item in menuItems" :key="item.id" text class="hidden-xs-only" :to="item.link">
        <v-icon left>{{item.icon}}</v-icon>
        {{item.title}}
      </v-btn>
      <v-btn v-if="userIsAuthenticated" text class="hidden-xs-only" @click="onLogout">
        <v-icon left>mdi-logout</v-icon>
        Logout
      </v-btn>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer app v-model="sideNav" temporary>
      <v-list dense>
        <v-list-item link v-for="item in menuItems" :key="item.id" :to="item.link">
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-if="userIsAuthenticated" @click="onLogout">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>

      <span v-if="showMeetups"><v-alert color="success" border="left" colored-border elevation="10">Upcoming Meetups</v-alert> </span>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
//import NavigationDrawer from "@/components/NavigationDrawer"


export default {
  name: 'App',

  components: {

  },

  data: () => ({
    sideNav: null,
    settings:true,
    showMeetups: false,

  }),
  computed: {
    menuItems () {
      let menuItems = [
        {icon:'mdi-face',title: 'Sign Up', link: '/signup'},
        {icon:'mdi-lock',title: 'Sign In',  link: '/signin'}
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
        {icon: 'mdi-account',title:'View Meetups', link: '/meetups'},
        {icon:'mdi-home',title: 'Organize Meetups', link: '/newmeetup'},
        {icon:'mdi-cactus',title: 'Profile', link: '/profile'},
                ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
    }
  }

};
</script>
