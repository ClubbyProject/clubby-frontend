<template>
  <v-layout column justify-center>
    <h1>所有社團</h1>
    <v-container fluid>
      <v-row dense>
      <v-col v-for="club in clubs" :key="club.id" :cols="6">
        <v-card raised>
          <v-card-text>
            <p class="display-1 text--primary">{{club.name}}</p>
            <div class="text--primary"  style="white-space: pre-line">{{club.description}}</div>
            <br>
            <p class="text--secondary">值班時間：{{club.dutyTime}}</p>
            <p class="text--secondary">值班地點：{{club.clubLocation}}</p>
            <p class="text--secondary">社課時間：{{club.meetTime}}</p>
            <p class="text--secondary">社課地點：{{club.meetLocation}}</p>
          </v-card-text>
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
    console.log("DOOM");
  }
};
</script>
