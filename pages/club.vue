<template>
  <v-layout column justify-center>
    <h1>{{clubName}}</h1>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col v-for="post in posts" :key="post.title" :cols="8">
          <v-card raised>
            <v-card-title>
              <span class="title font-weight-light">{{post.title}}</span>
            </v-card-title>
            <v-card-text>
              <p>{{post.context}}</p>
            </v-card-text>
            <v-carousel v-if="post.Imagelist.length !== 0">
              <v-carousel-item
                v-for="(img,i) in post.Imagelist"
                :key="i"
                :src="img.src"
                :href="img.src"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
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
      clubName: null,
      posts: []
    };
  },
  async mounted() {
    const params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    let resp = await this.$nuxt.$axios.get("/club/" + id + "/post");
    console.log(resp.data);
    this.clubName = resp.data[0].name;
    resp.data[0].post.forEach(e => {
      var imglist = [];
      if (e.imageList.split(",")[0] !== "") {
        imglist = e.imageList
          .split(",")
          .map(x => ({ src: "http://i.imgur.com/" + x }));
      }
      this.posts.push({
        title: e.title,
        context: e.context,
        Imagelist: imglist,
        createAt: e.createAt
      });
    });
  }
};
</script>
