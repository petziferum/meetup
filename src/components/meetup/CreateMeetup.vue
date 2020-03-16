<template>
    <v-container>
        <span class="">Create new Meetup</span>
        <v-divider></v-divider>
        <v-form v-model="valid" @submit.prevent="onCreateMeetup">
        <v-row >
            <v-col lg="6" md="6">
                <v-text-field :rules="titleRules" v-model="title" :counter="5" append-icon="mdi-cactus" filled label="Title">
                </v-text-field>
                <v-text-field v-model="location" label="Location" filled name="location" :rules="locationRules"></v-text-field>
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
                        prepend-icon="mdi-calendar"
                ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu = false" no-title scrollable>
                    </v-date-picker>
                </v-menu>
                <v-menu
                    ref="menu"
                    v-model="timepicker"
                    :return-value.sync="time"
                    max-width="290px"
                    min-width="290px"
                    offset-y
                    :close-on-content-click="false"
                    nudge-right="40"
                    >
                    <template v-slot:activator="{ on }">
                        <v-text-field label="Time" v-model="time" v-on="on" prepend-icon="mdi-clock"></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="timepicker"
                        v-model="time"
                        full-width
                        format="24hr"
                        @click:minute="$refs.menu.save(time)"
                        >
                    </v-time-picker>
                </v-menu>
                <v-text-field
                    name="imgsrc"
                    label="Image"
                    id="imgsrc"
                v-model="imgsrc"
                prepend-icon="mdi-image"
                ></v-text-field>
                <img height="200px" :src="imgsrc">
                <v-textarea v-model="description" label="Description" hint="Beschreibe kurz die Veranstaltung"></v-textarea>
                <v-btn class="primary" :disabled="!valid" type="submit">Create Meetup</v-btn>
            </v-col>
        </v-row>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        data:() =>({
            timepicker:false,
            time:null,
            valid:false,
            date: new Date().toISOString().substr(0, 10),
            menu:false,
            title:'',
            imgsrc:'',
            location:'',
            description: '',

            titleRules:[
                v => !!v || 'Title is required',
                v => 5 <= v.length  || 'Title must be more than 5 characters',
            ],
            locationRules:[
                v => !!v || 'Location is required',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],

        }),
        methods:{
            onCreateMeetup(){
                if(!this.formIsValid) {
                    return
                }
                const meetupData ={
                    title:this.title,
                    location: this.location,
                    imgsrc: this.imgsrc,
                    description: this.description,
                    date: this.date,
                    time:this.time,
                }
                this.$store.dispatch('createMeetup', meetupData)
                this.$router.push('/meetups')
            }
        },
        computed:{
            formIsValid(){
                return this.title !== '' && this.location !=='' && this.imagesrc !== ''
            }
        }
    }
</script>

<style scoped>

</style>