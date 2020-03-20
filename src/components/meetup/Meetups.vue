<template>
    <v-container>
        <v-row class="mb-2" height="100px" v-for="meetup in meetups" :key="meetup.id" style="border:1px solid">
            <v-col>
                <v-skeleton-loader class="" type="card" max-width="100%" v-if="loading"></v-skeleton-loader>
                <v-card  shaped class="mx-auto pa-0" width="100%"  height="200px" style="overflow:hidden; cursor:pointer;" color="white">
                    <v-container class="ma-0 pa-0">
                        <v-row class="ma-0 pa-0">
                            <v-col cols="6" class="ma-0 pa-0"  style="border:1px solid">
                                <v-img aspect-ratio="3" cover :src="meetup.imgsrc"></v-img>
                            </v-col>
                            <v-col cols="6" style="border:1px solid">
                                <v-card-title>{{meetup.title}}</v-card-title>
                                <v-card-text>{{meetup}}</v-card-text>
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
