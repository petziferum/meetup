<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Häufig gestellte Fragen</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-sheet elevation="3" class="pa-2">
                        <v-text-field
                                v-model="filterText"
                                hide-no-data
                                placeholder="Finde die Antwort!!!"
                                label="FAQ Suche"
                                prepend-icon="mdi-magnify"
                                filled
                                color="secondary"
                        ></v-text-field>
                    </v-sheet>

                    <v-sheet width="100%">
                        <v-list>
                            <v-list-item two-line v-for="item in searchFilter" :key="item.id">
                                <v-list-item-content>
                                    <v-list-item-title class="headline">{{
                                        item.frage
                                        }}</v-list-item-title>
                                    <v-list-item-subtitle class="body-1">{{
                                        item.antwort
                                        }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-sheet>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Faq",
        data() {
            return {
                isLoading: false,
                filterText: "",
                objekt: [
                    { frage: "Warum ist das so?", antwort: "Weils halt so ist..." },
                    { frage: "Was kann ich tun?", antwort: "Nichts!" },
                    { frage: "Wer ist Schuld?", antwort: "Der Klimawande!!11" },
                    { frage: "Wer ist mein Ansprechpartner?", antwort: "Deine Mutter!" },
                    { frage: "Wer hört mir zu?", antwort: "Niemand!" },
                    {
                        frage: "Mein Kopf tut weh, was tue ich dagegen?",
                        antwort: "Bier trinken!"
                    },
                    {
                        frage: "Ich werde gemobbt, wie kann ich mich wehren?",
                        antwort: "Sprich uns an!"
                    }
                ]
            };
        },
        methods: {},
        computed: {
            searchFilter() {
                return this.objekt.filter(el => {
                    return this.filterText
                        .toLowerCase()
                        .split(" ")
                        .every(v => el.frage.toLowerCase().includes(v));
                });
            }
        }
    };
</script>

<style scoped></style>
