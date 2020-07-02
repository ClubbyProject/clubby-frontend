<template>
  <v-layout
    column
    justify-center
  >
    <h1>今日活動社團</h1>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>
            <v-card-subtitle class="pb-0" v-text="card.description"></v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <h1>行事曆</h1>
    </v-container>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  data () {
    return {
      cards: [
        { title: '回家社', description: "回家", src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 2 },
        { title: '露營社', description: "一起搭帳篷", src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 2 },
        { title: '旅遊社', description: "粗乃丸", src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 2 },
      ],
      calendar: {}
    }
  },
}
</script>
