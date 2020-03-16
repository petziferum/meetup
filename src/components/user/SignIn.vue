<template>
    <v-container>
        <v-row v-if="error">
            <v-col cols="12" class="d-flex justify-center">
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="d-flex justify-center">
                <v-card width="300px" class="px-2">
                    <v-card-title>
                        Sign In
                    </v-card-title>
                    <v-form v-model="valid" @submit.prevent="onSignIn">
                        <v-row>
                            <v-col>
                                <v-text-field
                                        name="email"
                                        label="Mail"
                                        id="email"
                                        v-model="email"
                                        :rules="emailRules"
                                        type="email"
                                        required>
                                </v-text-field><v-text-field
                                    name="password"
                                    label="password"
                                    id="password"
                                    v-model="password"
                                    type="password"
                                    required>
                            </v-text-field>
                                <v-btn type="submit" color="blue" :disabled="loading" :loading="loading">Sign In</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "SignIn.vue",
        data(){
            return {
                email: '',
                password: '',
                confirmPassword: '',
                valid:false,
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ]
            }
        },
        computed: {
            user () {
                return this.$store.getters.user
            },
            error (){
                return this.$store.getters.error
            },
            loading () {
                return this.$store.getters.loading
            }
        },
        watch: {
            user (value) {
                if(value !== null && value !== undefined){
                    this.$router.push('/')
                }
            }
        },
        methods: {
            onSignIn () {
                this.$store.dispatch('signUserIn', {email:this.email, password:this.password})
            },
            onDismissed () {
                console.log('Dissmissed Alert')
                this.$store.dispatch('clearError')
            }
        }
    }
</script>

<style scoped>

</style>