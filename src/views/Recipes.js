const Recipe = () => import('@/components/Recipe')

export default class Recipes {
  name = 'recipes-view'
  links = [
    { path: '/recipes', text: 'all recipes', divider: true },
    { path: '/recipes/new', text: 'add new', divider: true },
    { path: '/recipes/drafts', text: 'drafts', divider: false }
  ]

  render() {
    return (
      <layout-component>
        <layout-top>
          <span slot="title">Recipes</span>
        </layout-top>

        <layout-content bg-color="#fff">
          <div slot="main" class="all-recipes">
            {this.sortedRecipes.length > 0 ? this.recipesList : null}
          </div>

          <div style="display: grid; min-width: 300px" slot="aside">
            <ul class="accent-list">
            {this.links.map(link => {
              return (
                <li onclick={() => this.$router.push(link.path)}>
                  {link.text}
                </li>
              )
            })}
            </ul>
          </div>
        </layout-content>
      </layout-component>
    )
  }

  get recipes() {
    return this.$store.state.recipes
  }

  get sortedRecipes(){
    if (this.recipes.length === 0) return []
    return this.recipes.sort((a, b) => {
      let nameA = a.name.toLowerCase();
      let nameB = b.name.toLowerCase();

      if(nameA < nameB) return -1;
      else if(nameA > nameB) return 1;
      return 0
    })
  }

  get recipesList() {
    return this.sortedRecipes.map(recipe => {
      return (
        <Recipe
          $router={this.$router}
          recipe={recipe}
          findTag={(tag) => this.findTag(tag)}>
        </Recipe>
      )
    })
  }

  findTag(tag) {
    this.$router.push({ name: 'TagResults', params: { selectedTag: tag }})
  }

  get styles() {
    return (`

      .all-recipes {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: auto;
        gap: 20px;
      }
      .recipes {
      display: grid;
      min-height: 500px;
      width: 900px;
      margin: 0 auto;
      padding: 30px;
      align-content: flex-start;
      justify-content: center;
      background-color: #f9f9f9;
      }

    .recipes-title {
      width: 100%;
      text-align: center;
      padding: 20px;
    }

    .recipes h1 {
      padding-top: 0;
      margin-top: 0;
      font-weight: 300;
      font-size: 34px;
      text-align: center;
          }

    .recipes-nav {

    }

          .recipes-nav a {
          text-decoration: none;
          color: #F08080;
          padding-bottom: 2px;
          border-bottom: 1px solid transparent;

          }

          .recipes-nav a:hover {
            color: #000;
          }

          .recipes-nav a.router-link-exact-active {
            color: #000;
            border-bottom: 1px solid #F08080;
          }

      .recipes-container {
      display: grid;
      align-content: flex-start;
      font-size: 18px;
      }

      .recipe {
        display: grid;
        align-content: flex-start;
        padding: 10px 25px;
        background-color: #f9f9f9;
      }


       .recipe-name {
          font-weight: 300;
          font-size: 24px;
          display: inline;

          }

          .recipe-name:hover {
            color: #000;
          }

          .title {
             font-weight: 400;
              margin-top: 0;
          }


          .tags-box {
            font-weight: 300;
            padding-top: 10px;
            padding-bottom: 20px;
          }

          .recipe-photo-link {
            height: auto;
            width: 100%;
            object-fit: cover;
            cursor: pointer;
          }


          @media screen and (max-width: 1200px){

          .recipes {
            width: 850px;
          }

          .recipe {
            width: 600px;
          }

          .photo-link-container img {
            width: 600px;

          }
          }

          @media screen and (max-width: 1000px){

          .recipes {
            width: 800px;
          }


          }

          @media screen and (max-width: 970px){
            .recipes {
              width: 700px;
            }

            .recipes h1 {
              font-size: 30px;
            }
          }

          @media screen and (max-width: 766px){

            .recipes {
              width: 550px;
              padding: 20px;
            }

            .recipes h1 {
              font-size: 28px;
            }

            .recipe {
              width: 500px;
            }

            .photo-link-container img {
              width: 500px;

            }

            .recipe-name {
              font-size: 20px;
            }
          }

          @media screen and (max-width: 590px){

            .recipes {
              width: 400px;
            }
            .recipe {
              width: 380px;
            }

            .photo-link-container img {
              width: 380px;
            }
          }

          @media screen and (max-width: 400px){

          .recipes {
            width: 360px;
            padding-left: 15px;
            padding-right: 15px;
          }

          .recipes h1 {
            font-size: 25px;
          }

          .recipe {
            width: 340px;
            padding-right: 5px;
            padding-left: 5px;
          }

          .photo-link-container img {
            width: 340px;

          }
        }
    `)
  }
}
