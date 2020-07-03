<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-group
        prepend-icon="mdi-account-group"
        v-if="userClubs.length > 0"
        value="true"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>你的社團</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(club, i) in userClubs"
            :key="i"
            :to="{name: 'club-id', params: {id: club.club.id}}"
            router exact
          >
            <v-list-item-title v-text="club.club.name"></v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group
        prepend-icon="mdi-account-group"
        v-if="clubs"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>更多社團</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(club, i) in clubs"
            :key="i"
            :to="{name: 'club-id', params: {id: club.id}}"
            router exact
          >
            <v-list-item-title v-text="club.name"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="primary" dark hide-on-scroll>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon v-if="token!==null" @click="logout">
        <v-icon>mdi-exit-run</v-icon>
      </v-btn>
      <v-btn icon v-if="token==null" @click="login">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} Clubby</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data({ app, params, store }) {
    return {
      clipped: false,
      userClubs: [],
      clubs: [],
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-home",
          title: "首頁",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "所有社團",
          to: "/clubs"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Clubby"
    };
  },
  async mounted(){
    let resp = await this.$nuxt.$axios.get("/club");
    this.clubs = resp.data;
    if(this.$nuxt.$store.state.token.value==null) return;
    try{
      let resp2 = await this.$nuxt.$axios.get("/user/0/club");
      this.userClubs = resp2.data;
    }catch{}
  },
  methods: {
    async login() {
      const user = await this.$nuxt.$gAuth.signIn();
      const response = await this.$nuxt.$axios.post("/login", {
        code: user.getAuthResponse().id_token
      });
      this.$store.commit("token/set", response.data);
    },
    async logout() {
      const response = await this.$nuxt.$gAuth.signOut();
      this.$store.commit("token/remove");
    }
  },
  computed: {
    token() {
      return this.$nuxt.$store.state.token.value;
    }
  }
};
</script>
