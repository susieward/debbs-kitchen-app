import { Api } from '@/api/api'
const RecipeEditor = () => import('@/components/recipe/RecipeEditor')
const RecipeIngredients = () => import('@/components/recipe/RecipeIngredients')
const RecipeInstructions = () => import('@/components/recipe/RecipeInstructions')
const RecipeTags = () => import('@/components/recipe/RecipeTags')

export default class RecipeView {
  name = 'recipe-view'
  components = { RecipeEditor, RecipeIngredients, RecipeTags, RecipeInstructions }
  state = () => ({
    showRecipeEditor: false,
    draft: false,
    recipe: {
      name: '',
      tags: [],
      photo: ''
    }
  })

  createdCallback() {
    const id = this.$route.params.id
    if (!id) {
      return this.showRecipeEditor = true
    } else {
      if (this.recipes.length === 0) {
        return this.getRecipe()
      }
      this.recipe = this.recipes.find(r => r.id === id)
    }
  }

  render() {
    return (
      <layout-component>
          <span slot="header-main">
            {this.recipe.name || 'New Recipe'}
          </span>
          <div slot="header-aside">
            {this.existingRecipe ? this.recipeButtons : <span class="item1">
              <button class="pinkbtn" onclick={() => this.save()}>
                save changes
              </button>
            </span>}
          </div>
          <div slot="subheader">
            <recipe-tags
              editing={this.showRecipeEditor}
              recipeTags={this.recipe.tags}
              onupdate={(e) => this.recipe.tags = e.detail}>
            </recipe-tags>
          </div>

        <div slot="content-main">
          <div class="recipe-container">
            <recipe-editor
                recipe={this.recipe}
                editing={this.showRecipeEditor}>
              </recipe-editor>
            <recipe-instructions
              editing={this.showRecipeEditor}
              recipe-id={this.recipe.id}>
            </recipe-instructions>
            </div>
        </div>
          <div style="min-width: 300px" slot="content-aside">
            <recipe-ingredients
              editing={this.showRecipeEditor}
              recipe-id={this.recipe.id}
              onupdate={(e) => this.recipe.ingredients = e.detail}>
            </recipe-ingredients>
          </div>
      </layout-component>
    )
  }

  get headerTitle() {
    if (this.existingRecipe && this.recipe?.name) {
      return this.showRecipeEditor ? `Edit Recipe: ${this.recipe.name}` : this.recipe.name
    }
    return 'New Recipe'
  }

  get existingRecipe() {
    return Boolean(this.$route.params.id)
  }

  get recipes() {
    return this.$store.state.recipes
  }

  get drafts() {
    return this.$store.state.drafts
  }

  get tag(){
    return this.$route.params.selectedTag
  }

  get recipeButtons() {
    return this.showRecipeEditor
    ? (
      <>
      <button class="greybtn" onclick={() => this.closeRecipeEditor()}>
        close editor
      </button>
      <span class="btnsrow">
        <span class="item1">
          <button class="pinkbtn" onclick={() => this.save()}>
            save changes
          </button>
        </span>
        <span class="item2">
          <button
            class="delete-btn"
            onclick={() => this.deleteRecipe(this.recipe.id)}>
            delete recipe
          </button>
        </span>
      </span>
      </>
  )
    : (
      <span>
      <button class="greybtn" onclick={() => this.openRecipeEditor()}>
        edit recipe
      </button>
      <button style="margin-left: 10px" class="pinkbtn">print</button>
      </span>
    )
  }

  openRecipeEditor() {
    this.showRecipeEditor = true
  }

  closeRecipeEditor(update = false) {
    this.showRecipeEditor = false
    if (update) this.getRecipe()
  }

  async getRecipe() {
    const id = this.$route.params.id
    this.recipe = await Api.$recipes.get(id)
    console.log(this.recipe)
  }

  async save() {
    const promise = this.existingRecipe ? this.update : this.create
    try {
      await promise()
      this.showRecipeEditor = false
      this.$store.dispatch('initRecipes')
    } catch (err) {
      console.error(err)
    }
  }

  async create() {
    return Api.$recipes.create(this.recipe)
  }

  async update() {
    return Api.$recipes.update(this.recipe, this.recipe.id)
  }

  async deleteRecipe(id) {
    try {
      let res = await Api.$recipes.delete(id)
      console.log(res)
      return this.$router.push('/recipes')
    } catch(err) {
      console.error(err)
    }
  }

  get styles() {
    return (`
      .button-link {
        text-decoration: none;
        color: var(--app-accent);
        padding-bottom: 2px;
        border-bottom: 1px solid transparent;
      }

      .recipe-photo-container {
        width: auto;
        height: 400px;
        margin-bottom: 20px;
      }

      .recipe-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .recipe-page {
        display: grid;
        align-content: flex-start;
        justify-content: center;
      }

      .recipe-page-container {
        display: grid;
        grid-template-columns: minmax(auto, 900px) 25%;
        grid-auto-rows: auto;
        grid-column-gap: 30px;
        min-height: 500px;
        align-content: flex-start;
        padding: 0 20px;
      }

      .recipe-container {
        display: grid;
        align-content: flex-start;
        padding: 40px;
        font-size: 18px;
        background-color: #f9f9f9;
        min-width: 800px;
        margin-right: 30px;
      }

          .recipe-back {
          display: none;
          justify-content: flex-start;
          align-content: center;
          padding-bottom: 20px;
          }

          .recipebtns {
          display: grid;
          grid-auto-flow: column;
          grid-column-gap: 10px;
          justify-content: flex-end;

          }

          @media screen and (max-width: 1200px){
            .recipe-page-container {
               width: 850px;
               padding: 30px;
            }

            .recipe-photo-container {
              display: grid;
              width: auto;
            justify-content: center;
            margin-bottom: 20px;

            }

            .recipe-photo {
              height: 400px;
              width: 600px;
              object-fit: cover;
            }

          }

          @media screen and (max-width: 1000px){
            .recipe-page-container {
               width: 800px;
            }

            .recipe-photo {
              height: 400px;
              width: 600px;
              object-fit: cover;
            }
          }

          @media screen and (max-width: 970px){
            .recipe-page-container {
               width: 700px;
            }

            .recipe-photo {
              height: 400px;
              width: 500px;
              object-fit: cover;
            }

            .recipe-container {
              padding: 20px;
          }
        }

          @media screen and (max-width: 766px){
            .recipe-page-container {
               width: 550px;
            }

            .recipe-name-div {
              font-size: 25px;
            }

            .recipe-photo {
              height: 400px;
              width: 450px;
              object-fit: cover;
            }

            .recipe-box-img {
              width: 500px;
            }
        }

          @media screen and (max-width: 590px){
            .recipe-page-container {
               width: 420px;
            }

            .recipe-name-div {
              font-size: 20px;
            }

            .recipe-photo {
              height: 400px;
              width: 360px;
            }

            .recipe-box-img {
              width: 400px;
            }

          }

        @media screen and (max-width: 400px){
            .recipe-page-container {
               width: 360px;
               padding-left: 15px;
               padding-right: 15px;

            }

            .recipe-container {
              font-size: 16px;
              line-height: 25px;
              padding: 10px;
          }

            .recipe-photo {
              height: 400px;
              width: 340px;

            }

            .recipe-box-img {
              width: 350px;
            }

          }



              @media print {
                .recipe-page-container {
                   width: 800px;
                   border: 1px solid #eee;


                }

                .recipe-container {
                  min-width: 700px;
                }

                .recipe-photo {
                  height: 400px;
                  width: 450px;
                  object-fit: cover;
                }

                .recipe-box-img {
                  width: 300px;
                }

                .recipebtns {
                  display: none;
                }

                #tags-paragraph {
                  display: none;
                }

              }

    `)
  }
}
