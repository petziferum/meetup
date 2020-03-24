<template>
    <v-dialog width="350px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn
                    text
                    color="success"
                    elevation="2"
                    acccent
                    small
                    v-on="on"
            >
                <v-icon class="px-2">mdi-thumb-up </v-icon>
                    {{ userIsRegistered ? 'Unregister' : 'Register'}}
            </v-btn>
        </template>

        <v-card>
            <v-container>
                <v-form v-model="valid" @submit.prevent="onSaveChanges">
                    <v-row>
                        <v-col>
                            <v-card-title v-if="userIsRegistered">Unregister from Meetup?</v-card-title>
                            <v-card-title v-else> Register for Meetup?</v-card-title>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            You can always change your decision later
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn small @click="dialog = !dialog">Cancel</v-btn>
                                <v-btn small :disabled="!valid" @click="onAgree">Ok</v-btn>
                            </v-card-actions>

                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "Dialog",
        props: ['meetup','meetupId'],
        data () {
            return {
                dialog: false,
                datePicker:false,
                timepicker: false,
                valid:false,
                editableDate: new Date(),
                editableTime:null,
                editedTitle: this.meetup.title,
                editedDescription: this.meetup.description,
                rules:[
                    v => !!v || 'Title is required',
                    v => v.length >= 5 || 'mindestens 5 Zeichen benötigt'
                ],
            }
        },
        computed: {
            userIsRegistered () {
                return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
                    return meetupId === this.meetupId
                }) >= 0
            }
        },
        methods: {
            onAgree () {
                if (this.userIsRegistered){
                    this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
                }else {
                    this.$store.dispatch('registerUserForMeetup', this.meetupId)
                }
            }
        }
    }
</script>

<style scoped>

</style>