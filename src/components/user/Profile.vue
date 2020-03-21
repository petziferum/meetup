<template>
    <v-container>
        <v-row>
            <v-col cols="12">
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
    </v-container>
</template>

<script>
    export default {
        name: "Profile.vue",
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
            }
        }
    }
</script>

<style scoped>

</style>