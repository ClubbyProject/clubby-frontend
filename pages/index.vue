<template>
  <v-layout
    column
    justify-center
  >
    <h1>本月活動</h1>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="(card, i) in cards"
          :key="i"
          sm="4" cols="6"
        >
          <v-card 
          style="width: 300px;"
          :to="{name: 'club-id' , params: { id: card.club.id }}"
          >
            <v-img
              :src="card.img"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.club.name"></v-card-title>
            </v-img>
            <v-card-subtitle class="pb-0" v-text="card.desc" v-if="card.desc"></v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  data () {
    return {
      cards: [],
      calendar: {}
    }
  },
  async mounted() {
    let resp = await this.$axios.get("/event");
    let events = resp.data;
    let maxLen = 50;
    if(events.length<maxLen) maxLen = events.length;
    for(let i=0; i<maxLen;i++){
      let body = {
        club: events[i].createByClubNavigation,
        desc: events[i].createByClubNavigation.description,
        img: "https://i.imgur.com/" + events[i].createByClubNavigation.post[0].imageList
      }
      if(body.desc){
        if(body.desc.length>50)
          body.desc = body.desc.substring(0, 50) + "...";
      }
      this.cards = this.cards.concat(body);
    }
  }
}
</script>
