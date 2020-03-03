<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card shaped class="d-inline-block pa-0" width="80%" style="overflow:hidden" color="info">
                    <v-container class="ma-0 pa-0">
                        <v-row class="ma-0 pa-0">
                            <v-col cols="auto" class="ma-0 pa-0">
                                <v-img  height="200" width="300" :src="require('@/assets/ensiferum.jpg')"></v-img>
                            </v-col>
                            <v-col cols="auto">
                                <v-card-title>Meetups</v-card-title>
                                <v-card-subtitle>27.04.2020 Augustiner-Keller</v-card-subtitle>
                                <v-card-actions>
                                    <v-btn class="ma-2" color="success">Teilnehmen! <v-icon right dense>mdi-thumb-up</v-icon></v-btn>
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
        name: "Meetups.vue"
    }
</script>

<style scoped>

</style>