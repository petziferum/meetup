import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
loadedMeetups:[],
    user: null,
    loading: true,
    error: null,
  },

  mutations: {
      registerUserForMeetup (state, payload) {
        const id = payload.id
        if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0){
            return
        }
        state.user.registeredMeetups.push(id)
          state.user.fbKey[id] = payload.fbKey
      },
      unregisterUserFromMeetup (state , payload){
          const registeredMeetups = state.user.registeredMeetups
          registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload, 1))
          console.log('fbKey delete: ', payload)
          Reflect.deleteProperty(state.user.fbKey, payload) /* fbKey wird im Store nicht gelöscht */
              console.log(state.user.fbKey)
      },
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
    },
      updateMeetup (state, payload) {
        const meetup = state.loadedMeetups.find(meetup => {
            return meetup.id === payload.id
        })
          if (payload.title) {
              meetup.title = payload.title
          }
          if (payload.description){
              meetup.description = payload.description
          }
          if (payload.date) {
              meetup.date = payload.date
          }
          if (payload.time) {
              meetup.time = payload.time
          }
      },
  },

  actions: {
      registerUserForMeetup ( {commit,getters}, payload) {
          console.log('register: ',payload)
          commit('setLoading', true)
          const user = getters.user
          firebase.database().ref('/users/' + user.id).child('/registrations/')
              .push(payload)
              .then((data) => {
                  commit('setLoading', false)
                  console.log("fbKey: ", data.key)
                  commit('registerUserForMeetup', { id: payload, fbKey: data.key})
              })
              .catch(error => {
                  console.log(error)
                  commit('setLoading', false)
              })
      },
      unregisterUserFromMeetup ({commit, getters},payload){
          console.log('unregister: ',payload)
          commit('setLoading', true)
          const user = getters.user
          if (!user.fbKey){
              console.log("kein fbKey!")
              return
          }
          const fbKey = user.fbKey[payload]
          firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
              .remove()
              .then(() => {
                  commit('setLoading', false)
                  commit('unregisterUserFromMeetup',fbKey," ", payload)
              })
              .catch(error => {
                  console.log(error)
                  commit('setLoading', false)
              })
      },
    loadMeetups ({commit}) {
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
                    filename: obj[key].filename,
                    location: obj[key].location,
                  date: obj[key].date,
                  time: obj[key].time,
                  creatorId:obj[key].creatorId
                })
              }
              console.log("Meetups loaded: ", meetups.length)
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
          filename: payload.filename,
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
      updateMeetupData ({commit}, payload){
        console.log("update ",payload)
        commit('setLoading',true)
          const updateObj = {}
          if (payload.title){
              updateObj.title = payload.title
          }
          if (payload.description) {
              updateObj.description = payload.description
          }
          if (payload.date) {
              console.log("Date updated:", payload.date)
              updateObj.date = payload.date
          }
          if (payload.time) {
              console.log("Time updated:", payload.time)
              updateObj.time = payload.time
          }
          console.log(updateObj)
          firebase.database().ref('meetups').child(payload.id).update(updateObj)
              .then(() => {
                    commit('setLoading', false)
                  commit('updateMeetup', payload)
              })
              .catch(error => {
                  console.log(error)
                  commit('setLoading',false)
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
                  registeredMeetups: [],
                    fbKey:{},
                    payload,
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
      commit('setLoading',true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then(
              user => {
                commit('setLoading',false)
                const newUser = {
                  id: user.uid,
                    fbKey:{},
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
      commit ('setUser', {
          id: payload.uid,
          fbKey:{},
          registeredMeetups: []
      })
        commit('setLoading', false)
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
