<template>
    <v-container>
        <v-row>
            <v-card shaped>
                <v-card-title>{{meetup.title}}</v-card-title>
                <v-img
                        class="ma-0"
                        :src="meetup.src"
                        height="300px"
                ></v-img>
                <v-card-text>
                    <div>{{meetup.location}}</div>
                    <div>Datum: {{meetup.date}}</div>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="primary">Teilnehmen!</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        props:['id'],
        computed:{
            meetup () {
                console.log("ID = ",this.id)
                return this.$store.getters.loadedMeetup(parseInt(this.id))
            }
        }
    }
</script>

<style scoped>

</style>