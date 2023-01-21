import { Api } from '@/api/api'

export default {
  state: {
    message: '',
    recipes: [],
    drafts: [],
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
    async init(context) {
      const promises = [
        Api.$recipes.getList(),
        Api.$menus.getList()
      ]
      try {
        const [recipes, menus] = await Promise.all(promises)
        context.commit('setState', 'recipes', recipes)
        context.commit('setState', 'menus', menus)
      } catch (err) {
        console.error(err)
      }
    },
    async initRecipes(context) {
      try {
        const recipes = await Api.$recipes.getList()
        context.commit('setState', 'recipes', recipes)
      } catch (err) {
        console.error(err)
      }
    },
    async initMenus(context) {
      try {
        const menus = await Api.$menus.getList()
        context.commit('setState', 'menus', menus)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
