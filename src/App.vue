<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar>
    <v-content>
      <Lscm/>
    </v-content>
  </v-app>
</template>

<script>
import Lscm from './components/Lscm';

export default {
  name: 'App',

  components: {
    Lscm,
  },

  data: () => ({
    //
  }),
};
</script>
