import * as firebase from 'firebase'


export default {
    state: {
        user: null,
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
        setUser (state,payload) {
            state.user = payload
        }
    },

    actions: {
        registerUserForMeetup ( {commit,getters}, payload) {
            console.log('register: ',payload)
            commit('setLoading', true)
            const user = getters.user
            firebase.database().ref('/users/' + user.id).child('/registration/')
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
            firebase.database().ref('/users/' + user.id + '/registration/').child(fbKey)
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
        },
        fetchUserData({commit,getters}){
            commit('setLoading', true)
            firebase.database().ref('/users/' + getters.user.id + '/registration/').once('value')
                .then(data => {
                    const dataPairs = data.val()
                    let registeredMeetups =[]
                    let swappedPairs = {}
                    for(let key in dataPairs) {
                        registeredMeetups.push(dataPairs[key])
                        swappedPairs[dataPairs[key]] = key
                    }
                    console.log("registeredMeetups: ",registeredMeetups,"swappedPairs: ", swappedPairs)
                    const updateUser = {
                        id: getters.user.id,
                        registeredMeetups: registeredMeetups,
                        fbKey: swappedPairs
                    }
                    commit('setLoading', false)
                    commit('setUser', updateUser)
                }).catch(error => {
                console.log(error)
                commit('setLoading', true)
            })
        },
        logout ({commit}){
            firebase.auth().signOut()
            commit('setUser', null)
        }
    },
    getters: {
        user (state) {
            return state.user
        },
    },
    modules: {
    }
}
