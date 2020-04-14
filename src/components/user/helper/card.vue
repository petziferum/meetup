<template>
    <v-card>
        <v-toolbar color="orange">
            <v-toolbar-title><slot name="title"></slot></v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <slot name="text"></slot>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "card",
        props:[],
        data() {
            return {

            }
        }
    }
</script>

<style scoped>

</style>
