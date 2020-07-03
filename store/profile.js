export const state = () => ({
    name: null,
    img: null
})

export const mutations = {
    setName (state, name) {
      state.name = name;
    },
    setImage(state, img) {
      state.img = img;
    },
    remove (state) {
      state.name = null;
      state.img = null;
    },
}