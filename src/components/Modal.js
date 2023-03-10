const MenuEditor = () => import('@/components/MenuEditor')
export default class Modal {
  name = 'app-modal'
  components = { MenuEditor }
  state = () => ({
    dishes: [],
    recipes: [],
    newDish: "",
    showEditor: false,
    newMenuContainer: false,
    selectedMenu: undefined,
    search: "",
    results: [],
    isOpen: false,
    inputErr: "",
    disabled: false
  })

  render() {
    return (
      <div class="modal-mask">
        <div class="modal-content">
          <div class="modal-title">
            <h2 class="menu-date">{`Menu for ${this.month} ${this.date}`}</h2>
            <span class="close">
              <span class="close-button" onclick={() => this.$emit('close')}>&times;</span>
            </span>
          </div>
          <div class="modal-container">
            <div class="modal-items">
            {this.newMenuContainer ? this.editor : this.currentMenus}
            </div>
            <span>
              <div>
                <span>
                  <button data-if={this.newMenuContainer == false} class="pinkbtn" onclick={() => this.addNewMenu()}>
                    add new menu
                  </button>
                  <button data-if={this.newMenuContainer == true} class="greybtn" onclick={() => this.closeNewMenu()}>
                    nevermind
                  </button>
                </span>
              </div>
            </span>
          </div>
        </div>
      </div>
    )
  }

  get currentMenus() {
    if (!this.menu?.id) return ''
    return (
        <div class="menus">
          <div class="menu-list-container">
          {this.showEditor
            ? (
              <menu-editor
                menu={this.menu}
                date={this.date}
                month={this.month}
                year={this.year}
                onclose={() => this.closeEditor()}>
              </menu-editor>
            ) :
            <ul class="menu-list">
            {this.menu.dishes.map(dish => {
              return (
                <li onclick={() => this.linkRecipe(dish)}>
                  {dish.name}
                </li>
              )
            })}
            </ul>}
          </div>
          <div class="menu-buttons-container">
            <span>
              <button class="blackbtn" onclick={() => this.deleteMenu(this.menu.id)}>
                delete menu
              </button>
            </span>
          </div>
        </div>
      )
  }

  get editor() {
    return (
      <menu-editor
        menu={this.selectedMenu}
        date={this.date}
        month={this.month}
        year={this.year}
        onclose={() => this.closeEditor()}>
      </menu-editor>
    )
  }

  get recipeNames() {
    return this.recipes.flatMap(recipe => recipe?.name || [])
  }

  linkRecipe(dish) {
    this.$router.push({ name: "RecipePage", params: { id: dish.id } })
  }

  openEditor(menu) {
    this.selectedMenu = menu;
    this.showEditor = true;
  }
  closeEditor() {
    this.showEditor = false;
    this.loadMenus();
  }
  addNewMenu() {
   this.newMenuContainer = true;
    this.showEditor = true
  }
  closeNewMenu() {
    if ((this.disabled = true)) {
      this.disabled = false;
    }
    this.newMenuContainer = false;
  }

  get styles() {
    return (`
      .menu-editor {
        margin-top: 20px;
      }

      .menus {
        display: grid;

        grid-template-columns: auto auto;
      }

      .menu-list-container {
        display: grid;
        padding-left: 10px;
        justify-content: flex-start;
      }

      .menu-buttons-container {
        display: grid;
        justify-content: flex-end;
      }

      .inputs {
        margin-bottom: 20px;
        margin-top: 20px;
      }

      .close {
        display: grid;
        justify-content: flex-end;
      }

      .close-button {
        font-size: 40px;
        cursor: pointer;
      }

      .close-button:hover {
        color: #eee;
      }

      .dishes {
        display: grid;
        grid-gap: 0;
      }

      .menu-list {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      .menu-list li {
        color: var(--app-accent);
        margin: 0;
        padding: 0;
        cursor: pointer;
      }

      .menu-list li:hover {
        color: #000;
      }

      .modal-title {
        display: grid;
        grid-template-columns: auto auto;
      }
      .menu-date {
        font-size: 25px;
        font-weight: 300;
      }

      .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: grid;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s ease;
      }

      .modal-content {
        display: grid;
        position: relative;
        align-content: flex-start;
        background-color: #fefefe;
        padding: 20px;
        width: 830px;
        min-width: auto;
        min-height: 400px;
        overflow: scroll;
        max-height: 550px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }

      .modal-container {
        display: grid;
        grid-gap: 20px;
        padding: 0px;
      }

      .modal-items {
        display: grid;
        background-color: #f9f9f9;
        padding: 20px;
        grid-gap: 0;
        min-height: 250px;
        align-items: flex-start;
      }

      .dish-item {
        width: 220px;
        border: 1px solid #777;
        border-radius: 6px;
        padding: 6px 8px;
        font-size: 16px;
      }

      .editbtn {
        border: none;
        border: 1px solid #000;
        border-radius: 6px;
        background-color: #000;
        padding: 6px 10px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        max-width: 150px;
      }

      .btns {
        display: grid;
        justify-content: center;
        grid-template-columns: auto auto;
        grid-gap: 10px;
        margin: auto;
        padding: 20px;
        border: 1px solid #eee;
      }

      .material-icons {
        cursor: pointer;
      }

      .modal-buttons {
        display: grid;
        align-items: flex-end;
        border: 1px solid #ddd;
      }

      .dishes-select li {
        display: block;
        background-color: #ddd;
        color: #444;
        cursor: pointer;
        letter-spacing: normal;
        padding: 4px 6px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
      }

      .dishes-select li:hover {
        background-color: #aaa;
        color: #fff;
        border-left: 1px solid #aaa;
        border-right: 1px solid #aaa;
      }

      @media screen and (max-width: 1200px) {
        .modal-content {
          width: 700px;
        }
      }

      @media screen and (max-width: 1000px) {
        .modal-content {
          width: 700px;
        }
      }

      @media screen and (max-width: 970px) {
        .modal-content {
          width: 680px;
        }

        .results-dropdown {
          width: 250px;
        }
      }

      @media screen and (max-width: 766px) {
        .modal-content {
          width: 500px;
        }

        .menu-date {
          font-size: 22px;
        }
      }

      @media screen and (max-width: 590px) {
        .modal-content {
          width: 400px;
        }

        .results-dropdown {
          width: 200px;
        }
      }

      @media screen and (max-width: 400px) {
        .modal-content {
          width: 380px;
        }
      }
    `)
  }
}
