import * as firebase from 'firebase'


export default {
    state: {
        loadedMeetups:[],
        user: null
    },

    mutations: {
        loadMeetups (state, payload){
            state.loadedMeetups = payload
        },
        createMeetup (state, payload){
            state.loadedMeetups.push(payload)
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
    },
    modules: {
    }
}
