import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
loadedMeetups:[],
    user: null,
    loading: false,
    error: null,
  },

  mutations: {
    loadMeetups (state, payload){
      state.loadedMeetups = payload
    },
    createMeetup (state, payload){
      state.loadedMeetups.push(payload)
    },
    setUser (state,payload) {
      state.user = payload
    },
    setLoading (state, payload){
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state){
      state.error = null
    }
  },

  actions: {
    loadMeetups ({commit,getters}) {
        commit('setLoading', true)
        firebase.database().ref('meetups').once('value')
            .then((data) => {
              const meetups = []
              const obj = data.val()
              for (let key in obj) {
                meetups.push({
                  id: key,
                  title: obj[key].title,
                  description: obj[key].description,
                  imgsrc: obj[key].imgsrc,
                  date: obj[key].date,
                  time: obj[key].time,
                  creatorId:getters.user.id
                })
              }
              commit('loadMeetups', meetups)
              commit('setLoading', false)
            })
            .catch((error) => {
              console.log(error)
              commit('seterror', true)
            })
    },
    createMeetup({commit,getters}, payload){
      const meetup = {
        title:payload.title,
        location: payload.location,
        date: payload.date,
        description: payload.description,
        time: payload.time,
        creatorId:getters.user.id
      }
      //Reach out to firebase and store it
        let imgsrc
        let key
        let ext
      firebase.database().ref('meetups').push(meetup)
          .then((data) => {
            key = data.key
              return key
            })
          .then(key => {
              const filename = payload.image.name
              ext = filename.slice(filename.lastIndexOf('.'))
              return firebase.storage().ref('meetups/' +key+ '.'+ ext).put(payload.image)
          })
          .then(fileData => {
              console.log(fileData)
              return firebase.storage().ref('meetups/' +key+ '.' + ext).getDownloadURL()
          })
          .then(URL => {
              imgsrc = URL
              console.log(imgsrc)
              return firebase.database().ref('meetups').child(key).update({ imgsrc: imgsrc })
          })
          .then(() => {
              commit('createMeetup', {
                  ...meetup,
                  id: key, //key wird im nachhinein erzeugt und angehängt
                  link: '/meetups/' + key,
                  imgsrc: imgsrc
              })
          })
          .catch((error) =>{
            console.log(error)
      })
    },
    signUserUp ({commit},payload) {
      commit('setLoading',true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then(
              user =>{
                commit('setLoading',false)
                const newUser = {
                  id: user.uid,
                  registeredMeetups: []
                }
                commit('setUser', newUser)
                console.log("new User:", newUser)
              })
          .catch (error =>{
            commit('setLoading',false)
            commit('setError', error)
            console.log(error)
          })
      },
    signUserIn ({commit},payload) {
      commit('setLoading',false)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then(
              user => {
                commit('setLoading',false)
                const newUser = {
                  id: user.uid,
                  registeredMeetups: []
                }
                commit('setUser',newUser)
              }
          ).catch(error => {
        commit('setLoading',false)
        commit('setError', error)
            console.log(error)
      })
    },
    autoSignIn ({commit}, payload){
      commit ('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logout ({commit}){
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError({commit}){
      commit('clearError')
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
    },
    loading (state) {
      return state.loading
    },
    error (state)
    {
      return state.error
    }  },
  modules: {
  }
})
