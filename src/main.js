import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as firebase from 'firebase'
import AlertCmp from './components/shared/Alert'
import EditMeetupDetailsDialog from './components/meetup/Edit/EditMeetupDetailsDialog'

Vue.config.productionTip = false

Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
        apiKey: "AIzaSyCwpWD-zssl_8wwXNPu8WkIC84qQ4_4YHY",
        authDomain: "meetup-edd70.firebaseapp.com",
        databaseURL: "https://meetup-edd70.firebaseio.com",
        projectId: "meetup-edd70",
        storageBucket: "gs://meetup-edd70.appspot.com",
        messagingSenderId: "592274862907",
        appId: "1:592274862907:web:36344466cd8a4bb93f3d1e"
        })
      firebase.auth().onAuthStateChanged((user) =>{
          if (user) {
              this.$store.dispatch('autoSignIn', user)
              this.$store.dispatch('loadMeetups')
          }
          else {
              this.$store.state.loading = false
          }
      })

  }
}).$mount('#app')
