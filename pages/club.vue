<template>
  <v-layout column justify-center>
    <h1>所有社團</h1>
    <v-container fluid>
      <v-row dense>
        <v-col v-for="club in clubs" :key="club.id" :cols="6">
          <v-card raised>
            <v-card-text>
                <p>ouo</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" >前往社團看版</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  data() {
    return {
      clubs: null
    };
  },
  mounted() {
    this.$nuxt.$axios.get("/club").then(resp => (this.clubs = resp.data));
  }
};
</script>
