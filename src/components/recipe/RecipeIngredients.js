import { Api } from '@/api/api'

export default class RecipeIngredients {
  name = 'recipe-ingredients'
  state = () => ({
    ingredients: [],
    newText: ''
  })

  static get observedAttributes() {
    return ['editing', 'recipe-id']
  }

  async createdCallback() {
    if (this['recipe-id']) {
      this.getIngredients()
    }
  }

  render() {
    return (
      <div>
        <span class="section-title">Ingredients:</span>
        <div class="ingredients">
        <ul class="accent-list">
          {this.ingredients.map((ingredient, index) => {
              return (
                <li>
                  <span data-if={this.editing} class="remove" onclick={() => this.removeIngr(index)}>x</span>
                  <span>{ingredient?.text || ingredient}</span>
                </li>
              )
            })}
            </ul>
          </div>
          <div>{this.editing ? this.editor : null}</div>
      </div>
    )
  }

  async getIngredients() {
    const id = this['recipe-id']
    try {
      const data = await Api.$ingredients.getByRecipeId(id)
      console.log(data)
      this.ingredients = data
    } catch (err) {
      console.error(err)
    }
  }

  get editor() {
    return (
      <span>
        <input
          type="text"
          class="recipe-edit-input"
          value={this.newText}
          oninput={(e) => this.newText = e.target.value}
          placeholder="e.g. eggs, flour, etc"/>
          <button
            class="blackbtn"
            onclick={() => this.addIngredient()}>
            add
          </button>
        </span>
    )
  }

  addIngredient() {
    if (this.newText === '') return
      var number = Date.now() + Math.random().toString().slice(18)
      var id = 'b' + number
      const index = this.ingredients.length + 1
      const obj = {
        text: this.newText,
        id,
        order: index
      }
      this.ingredients.push(obj)
      this.newText = ''
  }

  removeIngr(index) {
    this.ingredients.splice(index, 1)
    // console.log(this.recipeEdit.ingredients)
    /*
    this.recipeEdit.ingredients.forEach((item, index) => {
      item.order = index
    })
    */
  }

  ingrChange(evt){
    let i = evt.moved.newIndex
    let e = evt.moved.element
    this.recipeEdit.ingredients.forEach((item, index) => {
        item.order = index
      })
    }
}
