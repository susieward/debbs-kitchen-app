import { Api } from '@/services/api'

export default {
  state: {
    message: '',
    recipes: [],
    menus: []
  },
  mutations: {
    setMessage(state, value) {
      state.message = value
    },
    setState(state, key, value) {
      state[key] = value
    }
  },
  actions: {
    updateMessage(context, value) {
      context.commit('setMessage', value)
    },
    async initRecipes(context) {
      try {
        const recipes = await Api.$recipes.getRecipes()
        context.commit('setState', 'recipes', recipes)
      } catch (err) {
        console.error(err)
      }
    },
    async initMenus(context) {
      try {
        const menus = await Api.$menus.getMenus()
        context.commit('setState', 'menus', menus)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
