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
                        Sign Up
                    </v-card-title>
                    <v-form v-model="valid" @submit.prevent="onSignup">
                    <v-row>
                        <v-col>
                            <v-text-field
                                    name="firstName"
                                    label="First name"
                                    id="firstName"
                                    v-model="firstName"
                                    :rules="rules"
                                    type="text"
                                    required>
                            </v-text-field>
                            <v-text-field
                                    name="lastName"
                                    label="Last name"
                                    id="lastName"
                                    v-model="lastName"
                                    :rules="rules"
                                    type="text"
                                    required>
                            </v-text-field>
                            <v-text-field
                                    name="nickName"
                                    label="Nickname"
                                    id="nickName"
                                    v-model="nickName"
                                    :rules="rules"
                                    type="text"
                                    required>
                            </v-text-field>
                            <v-text-field
                            name="email"
                            label="Mail"
                            id="email"
                            v-model="email"
                            :rules="emailRules"
                            type="email"
                            required>
                            </v-text-field>
                            <v-text-field
                                name="password"
                                label="password"
                                id="password"
                                v-model="password"
                                type="password"
                                required>
                        </v-text-field>
                            <v-text-field
                                    name="confirmPassword"
                                    label="confirmPassword"
                                    id="confirmPassword"
                                    v-model="confirmPassword"
                                    :rules="[comparePasswords]"
                                    type="password"
                                    required>
                            </v-text-field>
                            <v-btn type="submit" color="success" :disabled="loading" :loading="loading">Sign up
                            </v-btn>
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
        name: "SignUp",
        data(){
            return {
                nickName:'',
                firstName:'',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                valid:false,
                rules:[
                    v => !!v || 'This Field must be entered!'
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                    ]
            }
        },
        computed: {
          comparePasswords () {
              return this.password !== this.confirmPassword ? 'Passwords do not match' : true
          },
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
                    this.$router.push('/meetups')
                }
            }
        },
        methods: {
            onSignup () {
                const userData = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    nickName:this.nickName,
                    email: this.email,
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                }
                console.log("user Data:",userData)
                this.$store.dispatch('signUserUp', userData)
                this.email = ''
                this.confirmPassword= ''
                this.password = ''
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