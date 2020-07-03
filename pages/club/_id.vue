<template>
  <v-layout column justify-center>
    <h1>{{clubName}}</h1>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col :cols="8">
          <v-card raised>
            <v-col>
              <p class="display-1 text--primary">發布貼文</p>
              <v-form ref="form">
                <v-text-field v-model="title" label="標題" required></v-text-field>
                <v-textarea v-model="content" filled name="input74" label="內容" value></v-textarea>
                <v-btn color="primary" @click="sendPost">送出</v-btn>
              </v-form>
            </v-col>
          </v-card>
        </v-col>
      </v-row>

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
      title: null,
      content: null,
      //
      clubName: null,
      posts: [],
      files: []
    };
  },
  async mounted() {
    const params = new URLSearchParams(window.location.search);
    var id = this.$route.params.id;
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
  },
  methods: {
    async sendPost() {
      const params = new URLSearchParams(window.location.search);
      var id = this.$route.params.id;
      var resp = await this.$nuxt.$axios.post("/club/" + id + "/post", {
        title: this.title,
        content: this.content,
        imageList: ""
      });
    }
  }
};
</script>
