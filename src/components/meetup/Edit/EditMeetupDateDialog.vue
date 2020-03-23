<template>
    <v-dialog width="300px" v-model="dialog">
    <template v-slot:activator="{ on }">
        <v-btn small text v-on="on"><v-icon>mdi-pencil</v-icon></v-btn>
    </template>

        <v-card>
            <v-container>
                <v-row>
                    <v-card-title>Edit Date</v-card-title>
                </v-row>
                <v-row>
                    <v-col>
                        Edit Date
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "EditMeetupDateDialog",
        props:['meetup'],
        data()  {
            return{
              dialog: false,
                editableDate: null,

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

                this.$store.dispatch('updateMeetupData', {
                    id: this.meetup.id,
                    date: newDate
                })
            }
        },
        created () {
            this.editableDate = new Date(this.meetup.date)
        }
    }
</script>

<style scoped>

</style>