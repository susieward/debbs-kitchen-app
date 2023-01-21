import BaseApi from './base'

// const ProdUrl = 'https://debbskitchen-server.herokuapp.com'
const ProdUrl = 'https://debbs-kitchen-api.xfilesgenerator.com'
const DevUrl = 'http://127.0.0.1:8000'
//export const ApiUrl = process.env.NODE_ENV === 'production' ? ProdUrl : DevUrl
const ApiUrl = DevUrl
const config = {
  menus: `${ApiUrl}/menu`,
  recipes: `${ApiUrl}/recipe`,
  instructions: `${ApiUrl}/instruction`,
  ingredients: `${ApiUrl}/ingredient`,
  drafts: `${ApiUrl}/draft`
}


const createApi = (url) => {
  const apiClass = class extends BaseApi {
    constructor() {
      super(url)
    }
  }
  return new apiClass()
}

const [
  Menus,
  Recipes,
  Instructions,
  Ingredients,
  Drafts
] = Object.values(config).map(url => createApi(url))

export class Api {
  static $menus = Menus
  static $recipes = Recipes
  static $drafts = Drafts
  static $instructions = Instructions
  static $ingredients = Ingredients
}
