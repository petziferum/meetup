<template >
    <v-dialog width="350px" v-model="dialog" >
        <template v-slot:activator="{ on }">
        <v-btn
                fab
                acccent
                small
                v-on="on"
        >
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
        </template>

        <v-card>
            <v-container>
                <v-row>
                    <v-col>
                      <v-card-title>Edit Meetup</v-card-title>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                                :counter="5"
                                append-icon="mdi-cactus"
                                filled label="Title">
                        </v-text-field>
                        <v-textarea
                                label="Description"
                                hint="Beschreibe kurz die Veranstaltung"
                        ></v-textarea>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn small>Cancel</v-btn>
                            <v-btn small>Ok</v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "EditMeetupDetailsDialog",
        data:() => ({
            dialog: false
        })

    }
</script>

<style scoped>

</style>