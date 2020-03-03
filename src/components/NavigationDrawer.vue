<template>
    <v-navigation-drawer app v-model="visible">
        <v-list dense>
            <v-list-item link to="/">
                <v-list-item-action>
                    <v-icon>mdi-settings</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title >Inhalt 1</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "NavigationDrawer.vue",
        props: ["visible"],
        data(){
            return {
            }
    }
    }
</script>

<style scoped>

</style>