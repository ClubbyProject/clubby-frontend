<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="primary"
      dark
      hide-on-scroll
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon v-if="authorized" @click="logout">
        <v-icon>mdi-exit-run</v-icon>
      </v-btn>
      <v-btn icon v-if="!authorized" @click="login">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      authorized: this.$nuxt.$gAuth.isAuthorized,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: '首頁',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: '所有社團',
          to: '/clubs'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Clubby'
    };
  },
  asyncData(){
    console.log("gAuth.isAuthorized=" + this.$nuxt.$gAuth.isAuthorized);
    return {authorized: this.$nuxt.$gAuth.isAuthorized };
  },
  methods: {
    async login(){
      const user = await this.$nuxt.$gAuth.signIn();
      const response = await this.$nuxt.$axios.post("/login", {"code": user.getAuthResponse().id_token });
      console.log(response);
      alert("Logged in");
    },
    async logout(){
      const response = await this.$nuxt.$gAuth.signOut();
      alert("Logged out");
    }
  }
}
</script>
