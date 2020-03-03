<template>
    <v-container>
        <span class="header-2">Create new Meetup</span>
        <v-divider></v-divider>
        <v-row dense>
            <v-col lg="3" md="6">
                <v-text-field append-icon="mdi-cactus" filled label="Title">
                </v-text-field>
                <v-text-field label="Location" filled name="location"></v-text-field>
                <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                min-width="290px"
                >
                    <template v-slot:activator="{on}">
                <v-text-field
                        label="Date"
                        v-model="date"
                        v-on="on"
                ></v-text-field></template>
                    <v-date-picker v-model="date" @input="menu = false" no-title scrollable>
                    </v-date-picker>
                </v-menu>
                <v-textarea label="Description" hint="Beschreibe kurz die Veranstaltung"></v-textarea>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data:() =>({
            date: new Date().toISOString().substr(0, 10),
            menu:false,
        })
    }
</script>

<style scoped>

</style>