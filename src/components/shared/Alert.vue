<template>
    <v-alert color="error" dismissible @input="onClose" :value="true">
        {{text}}
    </v-alert>
</template>

<script>
    export default {
        name: "Alert",
        props: ['text'],
        data: () => ({

        }),
        methods: {
            onClose () {
                this.$emit('dismissed')
            }
        }
    }
</script>

<style scoped>

</style>