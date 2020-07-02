import Vue from 'vue'
import GAuth from 'vue-google-oauth2'
 
const gauthOption = {
  clientId: '981892379370-dehacq190c4q8mvfnehp907erapfvtrj.apps.googleusercontent.com',
  scope: 'profile email openid',
  prompt: 'consent',
  response_type: 'id_token',
  hosted_domain: 'gemail.yuntech.edu.tw'
}

Vue.use(GAuth, gauthOption)