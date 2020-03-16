<template>
    <v-container>
        <v-row class="mb-9">
            <v-col cols="12" v-for="meetup in meetups" :key="meetup.id">
                <v-skeleton-loader class="" type="card" max-width="500px" v-if="loading"></v-skeleton-loader>
                <v-card  shaped class="mx-auto pa-0" width="50%" style="overflow:hidden; cursor:pointer;" color="white">
                    <v-container class="ma-0 pa-0">
                        <v-row class="ma-0 pa-0">
                            <v-col cols="auto" class="ma-0 pa-0">
                                <v-img  height="200px" width="300px" :src="meetup.imgsrc"></v-img>
                            </v-col>
                            <v-col cols="auto">
                                <v-card-title>{{meetup.title}}</v-card-title>
                                <v-list>
                                <v-list-item>{{meetup.date}}</v-list-item>
                                <v-list-item dense> ID: {{meetup.id}}</v-list-item>
                                <v-list-item dense>Ersteller ID: {{meetup.creatorId}}</v-list-item>
                                </v-list>
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
            },
            loading() {
                return this.$store.getters.loading
            }
        }
    }
</script>

<style scoped>

</style>
