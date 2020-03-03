<template>
    <v-container>
        <v-row>
            <v-col v-for="meetup in meetups" :key="meetup.id">
                <v-card  shaped class="d-inline-block pa-0" width="80%" style="overflow:hidden" color="info">
                    <v-container class="ma-0 pa-0">
                        <v-row class="ma-0 pa-0">
                            <v-col cols="auto" class="ma-0 pa-0">
                                <v-img  height="200" width="300" :src="meetup.src"></v-img>
                            </v-col>
                            <v-col cols="auto">
                                <v-card-title>{{meetup.title}}</v-card-title>
                                <v-card-subtitle>{{meetup.date}}</v-card-subtitle>
                                <v-card-actions>
                                    <v-btn class="ma-2" color="success" :to="'/meetup/'+meetup.id">Ansehen <v-icon right dense>mdi-thumb-up</v-icon></v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                    </v-container>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Meetups.vue",
        computed: {
            meetups(){
                return this.$store.getters.loadedMeetups
            }
        }
    }
</script>

<style scoped>

</style>