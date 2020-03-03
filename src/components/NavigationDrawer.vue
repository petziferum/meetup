<template>
    <v-navigation-drawer app v-model="visible">
        <v-list dense>
            <v-list-item link  @click="$vuetify.goTo('#Inhalt1')">
                <v-list-item-action>
                    <v-icon>mdi-settings</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title @click="$emit('settings')">Inhalt 1</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link @click="$vuetify.goTo('#Inhalt2')">
                <v-list-item-action>
                    <v-icon>mdi-view-dashboard</v-icon>
                </v-list-item-action>
                <v-list-item-content >
                    <v-list-item-title>Inhalt 2 </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link @click="$vuetify.goTo('#Inhalt3')">
                <v-list-item-action>
                    <v-icon>mdi-view-dashboard</v-icon>
                </v-list-item-action>
                <v-list-item-content >
                    <v-list-item-title>Inhalt 3 </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link @click="$vuetify.goTo('#Settings')">
                <v-list-item-action>
                    <v-icon>mdi-settings</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Settings</v-list-item-title>
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