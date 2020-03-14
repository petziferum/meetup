import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
loadedMeetups:[{
  imgsrc:require("@/assets/ensiferum.jpg"),
  id: 1,
  title: 'Meetup in New York',
  location: 'Augustinerkeller am Timesquare',
  date:'2020-04-27'
  },
  {
    imgsrc:require("@/assets/ensiferum.jpg"),
    id: 2,
    title: 'Meetup in Aschheim',
    location:'ufm Klo',
    date:'2020-04-29'
  }
],
    user:{id:'userDummy',registeredMeetups:[1]}
  },
  mutations: {
    createMeetup (state, payload){
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createMeetup({commit}, payload){
      const meetup = {
        title:payload.title,
        location: payload.location,
        imgsrc: payload.imgsrc,
        date: payload.date,
        description: payload.description,
        id: 123,
        time: payload.time,
      }
      //Reach out to firebase and store it
      commit('createMeetup',meetup)
    }
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
