<template>
    <v-container>
        <v-row align="justify-center">
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
        <v-row align="justify-center">
            <v-col cols="6">
                <app-card><h3 slot="title">Das sollte im Titleslot stehen</h3>
                <v-card-text slot="text">Das ist im Slot Text</v-card-text>
                </app-card>
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
            infizierte:'',
            gesamt:'',
            prozent: 0,

        }),
        methods: {

        },
        computed: {
            zahl() {
                let einwohner = this.gesamt
                let infizierte = this.infizierte
                const ergebniss =  infizierte/einwohner *100
                return ergebniss.toFixed(4)
            },

        }
    }
</script>

<style lang="scss">
    .v-card--material {
        &__header {
            &.v-card {
                border-radius: 4px;
            }
        }
    }
</style>
