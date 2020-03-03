<template>
    <v-container>
        <v-row>
            <v-card shaped>
                <v-card-title>Title des Meetings</v-card-title>
                <v-img
                        class="ma-0"
                        src="https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg"
                        height="300px"
                ></v-img>
                <v-card-text>
                    <div>27.04.2020</div>
                    <div>Augustiner Keller</div>
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
        name: "Meetup"
    }
</script>

<style scoped>

</style>