<template>
    <v-container>
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
                            <v-text-field
                                    name="confirmPassword"
                                    label="confirmPassword"
                                    id="confirmPassword"
                                    v-model="confirmPassword"
                                    :rules="[comparePasswords]"
                                    type="password"
                                    required>
                            </v-text-field>
                            <v-btn type="submit" color="success">Sign up</v-btn>
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
          comparePasswords () {
              return this.password !== this.confirmPassword ? 'Passwords do not match' : true
          },
            user () {
              return this.$store.getters.user
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
            onSignup () {
                const userData = {
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

        }
    }
</script>

<style scoped>

</style>