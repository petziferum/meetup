<template >
    <v-dialog width="350px" v-model="dialog" >
        <template v-slot:activator="{ on }">
        <v-btn
                fab
                acccent
                small
                v-on="on"
        >
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
        </template>

        <v-card>
            <v-container>
                <v-form v-model="valid" @submit.prevent="onSaveChanges">
                <v-row>
                    <v-col>
                      <v-card-title>Edit Meetup</v-card-title>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                                append-icon="mdi-cactus"
                                label="Title"
                                v-model="editedTitle"
                                :rules="rules"
                                id="Title">
                        </v-text-field>
                        <v-textarea
                                label="Description"
                                v-model="editedDescription"
                                hint="Beschreibe kurz die Veranstaltung"
                        ></v-textarea>

                        <v-menu
                                v-model="menu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                min-width="290px"
                        >
                            <template v-slot:activator="{on}">
                                <v-text-field
                                        label="Date"
                                        v-model=" editableDate"
                                        v-on="on"
                                        prepend-icon="mdi-calendar"
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="editableDate" @input="menu = false" no-title scrollable>
                            </v-date-picker>
                        </v-menu>

                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn small @click="dialog = !dialog">Cancel</v-btn>
                            <v-btn small :disabled="!valid" @click="onSaveChanges">Ok</v-btn>
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
        props: ['meetup'],
        data () {
            return {
                dialog: false,
                menu:false,
                valid:false,
                editableDate: null,
                editedTitle: this.meetup.title,
                editedDescription: this.meetup.description,
                rules:[
                    v => !!v || 'Title is required',
                    v => v.length >= 5 || 'mindestens 5 Zeichen benötigt'
                ],
            }
        },
        methods: {
            onSaveChanges() {
                const newDate = new Date(this.meetup.date)
                const newDay = new Date(this.editableDate).getUTCDate()
                const newMonth = new Date(this.editableDate).getUTCMonth()
                const newYear = new Date(this.editableDate).getUTCFullYear()
                newDate.setUTCDate(newDay)
                newDate.setUTCMonth(newMonth)
                newDate.setUTCFullYear(newYear)
                const payload = {
                    id: this.meetup.id,
                    date: newDate,
                    title: this.editedTitle,
                    description: this.editedDescription
                }
                    this.$store.dispatch('updateMeetupData',payload)
                    this.dialog = false
            },
        },
        created () {
            this.editableDate = new Date(this.meetup.date)
        }
    }
</script>

<style scoped>

</style>