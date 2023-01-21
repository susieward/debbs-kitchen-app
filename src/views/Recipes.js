const RecipeCard = () => import('@/components/recipe/RecipeCard')

export default class Recipes {
  name = 'recipes-view'
  state = () => ({
    currentItems: 'recipes'
  })

  render() {
    return (
      <layout-component>
        <div slot="header-main">
          Recipes
        </div>
        <menu slot="header-aside">
          <li onclick={() => this.currentItems = 'recipes'}>
            Recipes
          </li>
          <li onclick={() => this.currentItems = 'drafts'}>
            Drafts
          </li>
          <li onclick={() => this.$router.push('/new')}>
            Add New
          </li>
        </menu>

        <div class="all-recipes" slot="content-main">
            {this.sortedItems.length > 0 ? this.recipesList : null}
        </div>
      </layout-component>
    )
  }

  get recipes() {
    return this.$store.state.recipes
  }

  get drafts() {
    return this.$store.state.drafts
  }

  get sortedItems() {
    const items = this[this.currentItems]
    if (items.length === 0) return []
    return items.sort((a, b) => {
      let nameA = a.name.toLowerCase();
      let nameB = b.name.toLowerCase();

      if(nameA < nameB) return -1;
      else if(nameA > nameB) return 1;
      return 0
    })
  }

  get recipesList() {
    return this.sortedItems.map(recipe => {
      return (
        <RecipeCard
          $router={this.$router}
          recipe={recipe}
          findTag={(tag) => this.findTag(tag)}>
        </RecipeCard>
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
        grid-template-columns: repeat(3, minmax(300px, 1fr));
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
          font-size: 22px;
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
