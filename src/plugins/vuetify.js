import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.blueGrey.darken1, // #546E7A
                secondary: colors.blueGrey.accent3, // #FFCDD2
                accent: colors.blue.lighten3, // #3F51B5
            },
        },
    },
});
