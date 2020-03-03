import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
loadedMeetups:[{
  src:require("@/assets/ensiferum.jpg"),
  id: 1,
  title: 'Meetup in New York',
  location: 'Augustinerkeller am Timesquare',
  date:'2020-04-27'
  },
  {
    src:require("@/assets/ensiferum.jpg"),
    id: 2,
    title: 'Meetup in New York',
    date:'2020-04-29'
  }
],
    user:{id:'userDummy',registeredMeetups:[1]}
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    loadedMeetups:(state) => {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    feturedMeetups:(state, getters) => {
      return getters.loadedMeetups.slice(0,5);
    },
    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  },
  modules: {
  }
})
