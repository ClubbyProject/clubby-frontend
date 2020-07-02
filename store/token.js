export const state = () => ({
    value: null
})

export const mutations = {
    set (state, text) {
      state.value = text;
    },
    remove (state) {
      state.value = null;
    },
}