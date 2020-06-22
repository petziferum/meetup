<template>
    <v-container>
        <v-card class="d-flex flex-row">
            <v-card class="ma-3" elevation="6">
                <v-card-text>
                    <v-list>
                        <v-list-group
                                v-for="location in partners"
                                :key="location.id"
                                color="accent"
                        >
                            <template v-slot:activator>
                                <v-list-item-title @click="selectedItem = null">{{
                                    location.name
                                    }}</v-list-item-title>
                            </template>
                            <v-list-item
                                    dense
                                    @click="selectedItem = partner"
                                    color="accent"
                                    v-for="partner in location.partners"
                                    :key="partner.id"
                            >
                                <v-list-item-title>{{ partner.name }}</v-list-item-title>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
                </v-card-text>
            </v-card>
            <v-divider vertical />
            <v-card flat v-if="selectedItem" style="width: 100%">
                <v-card-title>{{ selectedItem.name }}</v-card-title>
                <v-card-text v-html="selectedItem.description" />
                <v-card-text>
                    {{selectedItem.competencies}}
                </v-card-text>
                <v-sheet>
                    <v-divider />
                    <v-card-actions>
                        <v-btn
                                link
                                v-for="(email, i) in selectedItem.contact.emails"
                                :key="`${i}-mail`"
                                :href="'mailto:' + email"
                                target="_blank"
                                v-text="email"
                        />
                        <v-btn
                                link
                                v-for="(link, i) in selectedItem.contact.links"
                                :key="i"
                                :href="link.url"
                                target="_blank"
                                v-text="link.name"
                        />
                    </v-card-actions>
                </v-sheet>
            </v-card>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "Documentary",
        data:() =>({
            partners: {
                local: {
                    name: "Local",
                    icon: "mdi-city",
                    partners: [{
                        id: 1,
                        name: "Partner 1",
                        description: "Beschreibung 1",
                        isLocal: true,
                        contact: {
                            emails: ["emails"],
                            links: [{url:"meetups",name:"link"}]
                        },
                    }]
                },
                central: {
                    name: "central",
                    icon: "mdi-map-marker",
                    partners: [{
                        id: 2,
                        name: "Partner 2",
                        description: "Beschreibung 2",
                        isLocal: false,
                        contact: {
                            id: 20,
                            department: "daheim",
                            emails: ["asdf"],
                            links: [{url: "meetups", name: "link"}]
                        },
                    }]
                }
            },
            selectedItem: undefined
        })
    }
</script>

<style scoped>

</style>
