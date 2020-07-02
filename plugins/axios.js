export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    if(store.state.token.value)
      config.headers.common['Authorization'] = store.state.token.value
  })
}