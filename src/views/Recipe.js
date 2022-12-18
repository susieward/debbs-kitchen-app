import { Api } from '@/services/api'

export default class Recipe {
  name = 'recipe-view'
  state = () => ({
    showRecipeEditor: false,
    selectedRecipe: {},
    output: null,
    recipe: {}
  })

  async createdCallback() {
    const id = this.$route.params.id
    if (this.recipes.length > 0) {
      this.recipe = this.recipes.find(r => r._id === id)
    } else {
      this.recipe = await Api.$recipes.getRecipeById(id)
      console.log(this.recipe)
    }
  }

  render() {
    return (
      <layout-component>
        <layout-top>
          <span slot="title">
            {this.showRecipeEditor ? 'Edit recipe' : this.recipe.name}
          </span>
          <div slot="header-right">
            {this.recipeButtons}
          </div>
          {this.recipe.tags?.length > 0 ? this.recipeTags : null}
        </layout-top>

        <layout-content>
          <div class="recipe-container" slot="main">
            <div data-if={Boolean(this.recipe.photo)} class="recipe-photo-container">
              <img class="recipe-photo" src={this.recipe.photo} />
            </div>
              {this.recipe.instructions?.length > 0 ? this.recipeInstructions : null}
            </div>
            <div style="display: grid; justify-content: flex-start" slot="aside">
              {this.recipe.ingredients?.length > 0 ? this.recipeIngredients : null}
            </div>
        </layout-content>
      </layout-component>
    )
  }

  get recipes() {
    return this.$store.state.recipes
  }

  get tag(){
    return this.$route.params.selectedTag
  }

  get recipeButtons() {
    return this.showRecipeEditor
    ? (<button class="greybtn" onclick={() => this.closeRecipeEditor()}>
      close editor
    </button>)
    : (
      <>
      <button class="greybtn" onclick={() => this.openRecipeEditor(this.recipe)}>
        edit recipe
      </button>
      <button style="margin-left: 10px" class="pinkbtn">print</button>
      </>
    )
  }

  get recipeIngredients() {
    return (
      <>
      <span class="section-title">Ingredients:</span>
        <ul class="accent-list">
        {this.recipe.ingredients.map(ingredient => {
          return (<li>{ingredient?.text || ingredient}</li>)
        })}
      </ul>
      </>
    )
  }

  get recipeTags() {
    return (
      <div slot="subheader" class="tags-section">
      Tags:
        {this.recipe.tags.map(tag => {
          return (<span class="tag">{tag}</span>)
        })}
      </div>
    )
  }

  get recipeInstructions() {
    return (
      <>
      <p class="section-title">Instructions:</p>
      <div class="recipe-directions">
      <ol style="margin-top: 0; padding-top: 0">
      {this.recipe.instructions.map((item, index) => {
        const text = <div class="directions-text"></div>
        text.innerHTML = item.text
        return (
          <li>
            {text}
            <div data-if={item.hasImage} class="recipe-box-img-container">
              {item.hasImage ? <img class="recipe-box-img" src={item.image} /> : null}
            </div>
          </li>
        )
      })}
      </ol>
      </div>
      </>
    )
  }

  openRecipeEditor(recipe) {
    this.showRecipeEditor = true
    this.selectedRecipe = recipe
  }

  closeRecipeEditor() {
    this.showRecipeEditor = false
    this.getRecipe()
  }

  async getRecipe() {
    const id = this.$route.params.id
    this.recipe = await this.$api.$recipes.getRecipeById(id)
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
        display: grid;
        width: 100%;
        justify-content: center;
        margin-bottom: 20px;
      }

      .recipe-photo {
        height: 400px;
        width: 700px;
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
        padding: 30px;
        font-size: 18px;
        width: 100%;
        max-width: 900px;
        background-color: #f9f9f9;
      }

      .tags-section {
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

       .recipe-name-div {
            display: grid;
          justify-content: flex-start;
          font-weight: 300;
          font-size: 30px;
          }

          .tags-title {


          }

          .recipe-ingredients {
            list-style-type: none;
            padding: 0;
            margin-left: 5px;
          }

              .recipe-ingredients li {
                display: block;
                border-left: 1px solid var(--app-accent);
                padding-left: 25px;
                padding-top: 0;
                margin-top: 0;
                padding-bottom: 4px;
                font-size: 16px;
              }

              .recipe-ingredients li:first-child {
              padding-top: 0;

              margin: 0;
              }

              .recipe-ingredients li:last-child {
              padding-bottom: 0;
              }

              .recipe-directions {
                display: grid;
                align-content: flex-start;
              }


              .directions-text {
              margin: 0;
              padding: 0;

              }

              .directions-text p {
                line-height: 28px;
              }

              .recipe-box-img-container {
                display: grid;
                justify-content: center;

              }

            .recipe-box-img {
              height: auto;
        width: 600px;
              object-fit: cover;


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

            .recipe-page {

            }
            .recipe-page-container {

               width: 420px;


            }

            .recipe-container {

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
