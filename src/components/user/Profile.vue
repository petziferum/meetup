<template>
    <v-container full-width style="border: 1px solid">
        <v-row align="center">
            <v-col cols="6">
                <v-text-field v-model="gesamt" label="Gesamtbevölkerung"></v-text-field>
                <v-text-field v-model="infizierte" label="Infizierte"></v-text-field>
                <v-progress-linear
                        :value="zahl"
                        height="20"
                        color="deep-purple accent-4"
                ></v-progress-linear>
                Prozentual Infizierte: {{ zahl }} %
            </v-col>
        </v-row>
        <v-row align="center">
            <v-col cols="6">
                <app-card><h3 slot="title">Das sollte im Titleslot stehen</h3>
                <v-card-text slot="text">Das ist im Slot Text</v-card-text>
                </app-card>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="12">
                <form>
                    <v-text-field v-model="autobrand" label="Marke"></v-text-field>
                    <v-text-field v-model="weight" label="Gewicht"></v-text-field>
                    <v-text-field v-model="speed" label="Höchstgeschwindigkeit"></v-text-field>
                    <v-btn @click="autoErstellen(autobrand,weight, speed)">doSomething</v-btn>
                <v-btn @click="infizierte = 0">null</v-btn>
                </form>


                <v-alert color="error">{{feedback}}</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import appCard from "./helper/card"
    export default {
        name: "Profile.vue",
        components: {
            appCard
        },
        data:() => ({
            infizierte:0,
            gesamt:0,
            prozent: 0,
            feedback: '',
            autobrand:'',
            weight: '',
            speed:'',
            autos: []

        }),
        methods: {
        },
        computed: {
            zahl() {
                let einwohner = this.gesamt
                let infizierte = this.infizierte
                   let ergebniss = infizierte / einwohner * 100
                return ergebniss.toFixed(2)
            },

        }
    }
</script>

<style lang="scss">

</style>
