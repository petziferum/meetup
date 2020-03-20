<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="d-flex justify-center">
            <v-card shaped max-width="500px">
                <v-card-title>{{meetup.title}}</v-card-title>
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
            }
        }
    }
</script>

<style scoped>

</style>