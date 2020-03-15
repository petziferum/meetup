import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

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
    user: null,
  },
  mutations: {
    createMeetup (state, payload){
      state.loadedMeetups.push(payload)
    },
    setUser (state,payload) {
      state.user = payload
    },
    signUserUp (state, payload) {
      state.user = payload
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
    },
    signUserUp ({commit},payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then(
              user =>{
                const newUser = {
                  id: user.uid,
                  registeredMeetups: []
                }
                commit('signUserUp', newUser)
                console.log("new User:", newUser)
              })
          .catch (error =>{ console.log(error)})
      },
    signUserIn ({commit},payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then(
              user => {
                const newUser = {
                  id: user.uid,
                  registeredMeetups: []
                }
                commit('setUser',newUser)
              }
          ).catch(errr => {
            console.log(errr)
      })
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
    },
    user (state) {
      return state.user
    }
  },
  modules: {
  }
})
