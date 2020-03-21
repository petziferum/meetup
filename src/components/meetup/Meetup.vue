<template>
    <v-container>
        <v-row>
            <v-col cols="12">
            <v-card shaped max-width="600px">
                    <v-toolbar color="primary">
                        <v-toolbar-title>
                            {{ meetup.title }} - <span class="caption">{{ meetup.creatorId}}</span>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                            <template v-if="userIsCreator">
                                <app-edit-meetup-details-dialog></app-edit-meetup-details-dialog>
                            </template>
                        <span v-else>Lol nix da</span>
                    </v-toolbar>
                <v-img
                        class="ma-0"
                        :src="meetup.imgsrc"

                ></v-img>
                <v-card-text>
                    <div>{{meetup.location}}</div>
                    <div>Datum: {{meetup.date}}</div>
                    <div>{{meetup}}</div>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="primary">Teilnehmen!</v-btn>
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