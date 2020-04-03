<template>
    <v-container>
        <v-row  v-if="loading">
            <v-col cols="12" class="d-flex justify-center">
                <div class="d-flex pa-2">
                    <v-skeleton-loader type="image" class="pa-2"></v-skeleton-loader>
                </div>
            </v-col>
            <v-col>
                <v-skeleton-loader type="image" tile></v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12">
            <v-card shaped max-width="600px">
                    <v-toolbar color="primary">
                        <v-toolbar-title>
                            {{ meetup.title }} - <span class="caption">{{ meetup.creatorId}}</span>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                            <template v-if="userIsCreator">
                                <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
                            </template>
                    </v-toolbar>
                <v-img
                        class="ma-0"
                        :src="meetup.imgsrc"

                ></v-img>
                <v-card-text>

                    <div>{{meetup.location}}</div>
                    <v-alert>
                        <v-row style="border: 1px solid">
                            <v-col cols="10">
                                <span class="caption">
                        <div>Datum: {{meetup.date}}</div>
                        <div>Zeit: {{meetup.time}}</div></span>
                            </v-col>
                        </v-row>
                    </v-alert>

                    <div>{{meetup}}</div>
                </v-card-text>
                <v-card-actions>
                    <app-register-meetup-dialog :meetup="meetup" :meetupId="meetup.id" v-if="userIsAuthenticated && !userIsCreator"></app-register-meetup-dialog>
                </v-card-actions>
            </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        props:['id'],
        computed:{
            loading() {
                return this.$store.getters.loading
            },
            meetup () {
                console.log("ID = ",this.id)
                return this.$store.getters.loadedMeetup(this.id)
            },
            userIsAuthenticated () {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
            userIsCreator () {
                if (!this.userIsAuthenticated){
                    console.log("nicht dein Meetup")
                    return false
                }
                console.log("Das ist von dir",this.$store.getters.user.id === this.meetup.creatorId)
                return this.$store.getters.user.id === this.meetup.creatorId
            }
        }
    }
</script>

<style scoped>

</style>