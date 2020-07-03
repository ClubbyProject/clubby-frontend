import createPersistedState from 'vuex-persistedstate'
 
export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        paths: ["token.value", "profile"]
    })(store)
  })
}