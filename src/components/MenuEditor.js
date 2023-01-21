import { Api } from '@/api/api'
export default class MenuEditor {
  name = 'menu-editor'
  state = () => ({
    disabled: false,
    newDish: '',
    menuEdit: {
      dishes: [],
      menuNote: ''
    },
    showResults: false,
    dishResults: []
  })

  watch = {
    newDish: {
      handler(newValue) {
        console.log(newValue)
        if (newValue && (this.results.length > 0) && this.dropdown.hidden) {
          this.dropdown.hidden = false
        } else if (!newValue && !this.dropdown.hidden) {
          this.dropdown.hidden = true
        }
        console.log(this.results)
      }
    }
  }

  static get observedAttributes() {
    return ['menu', 'date', 'month', 'year']
  }

  createdCallback() {
    if(!this.menu || this.menu === 'undefined'){
      this.menuEdit = {
        date: this.date,
        month: this.month,
        year: this.year,
        dishes: [],
        menuNote: ''
      }
    } else {
      this.menuEdit = { ...this.menu }
    }
    console.log(this.menuEdit)
  }

  render() {
    return (
      <div class="menu-editor">
        <div class="editor-list-container">
          <ul class="menu-list-edit">
          {this.menuEdit.dishes.map((dish, index) => {
            return (
              <li>
                <span class="remove" onclick={() => this.removeDish(index)}>x</span>
                {dish.name}
              </li>
            )
          })}
          </ul>
          <div class="inputs">
          <span>
            <input
              id="dish-input"
              type="text"
              class="dish-item"
              oninput={(e) => this.newDish = e.target.value}
              placeholder="Add new item or start typing recipe name" />
              <button
                onclick={() => this.addDish()}
                class="greybtn">
                add
                </button>
              </span>
            <div style="position: relative">
              <div id="results" class="results-dropdown" hidden>
                <map-items
                  class="dishes-select"
                  items={this.results}
                  data-for={(result) => {
                    return (
                      <li onclick={() => this.addToDishes(result)}>
                        {result.name}
                      </li>
                    )
                  }}>
                </map-items>
              </div>
            </div>
          </div>
          <div class="note-container">
            <textarea
              value={this.menuEdit.menuNote}
              oninput={(e) => this.menuEdit.menuNote = e.target.value}
              placeholder="Add note">
            </textarea>
          </div>
        </div>
        <div class="editor-buttons-container">
          <span>
            <button class="pinkbtn" onclick={() => this.save()}>
              save changes
            </button>
            <button class="greybtn" onclick={() => this.$emit('close')}>
              close editor
            </button>
          </span>
       </div>
      </div>
    )
  }

  get input() {
    return this.$querySelector('#dish-input')
  }

  get dropdown() {
    return this.$querySelector('#results')
  }

  get existingMenu() {
    return Boolean(this.menuEdit?.id)
  }

  get recipes() {
    return this.$store.state.recipes
  }

  get results() {
    if (this.newDish) {
      return this.recipes.flatMap(recipe => {
        const { name, id } = recipe
        if (name.toLowerCase().startsWith(this.newDish.toLowerCase())
          && !this.menuEdit.dishes.find(d => d.name === name)) {
          return { name, id }
        }
        return []
      })
    }
    return []
  }

  checkInput(){
    if(this.newDish === ''){
      this.disabled = true;
    } else {
      this.disabled = false;
      this.addDish();
    }
  }

  addToDishes(result){
    this.menuEdit.dishes.push({ name: result.name, id: result.id })
    this.newDish = ''
  }

  addDish(){
    this.menuEdit.dishes.push({ name: this.newDish })
    this.newDish = ''
  }

  removeDish(index){
    let dishes = this.menuEdit.dishes
    dishes.splice(index, 1)
  }

  async save() {
    const promise = this.existingMenu ? this.update : this.create
    try {
      const res = await promise()
      console.log(res)
      await this.$store.dispatch('initMenus')
    } catch (err) {
      console.error(err)
    }
  }

  async create() {
    this.menuEdit.year = `${this.menuEdit.year}`
    return Api.$menus.create(this.menuEdit)
  }

  async update() {
    return Api.$menus.update(this.menuEdit, this.menuEdit.id)
  }

  get styles() {
    return (`
      .menu-editor {
          display: grid;
          grid-template-columns: auto auto;

      margin: 0;
      padding: 0;
      }

      .menus {
          display: grid;
          grid-gap: 0;

      }

      .inputs {
        display: grid;
       margin-top: 20px;

      }

       .editor-list-container {
          display: grid;
          padding-left: 10px;
          justify-content: flex-start;

      }

      .editor-buttons-container {
          display: grid;
          justify-content: flex-end;
      }

      .close {
      display: grid;
      justify-content: flex-end;

      }

      .close-button{
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

      .menu-list-edit {
      list-style-type: none;
      margin: 0;
      padding: 0;
      }

      .menu-list-edit li {
      margin: 0;
      padding: 0;
      color: #000;
      cursor: normal;
      }

      .remove {
          color: #e50000;
          font-size: 18px;
          margin-right: 5px;
          padding: 2px;
          cursor: pointer;
      }

      .dish-item{
      width: 400px;
      border: 1px solid #777;
      border-radius: 6px;
      padding: 6px 8px;
      font-size: 16px;
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

      .results-dropdown {
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 10;
        background-color: #fff;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      }

      .dishes-select {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      .dishes-select li {
      display: block;
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


      @media screen and (max-width: 590px){
        .results-dropdown {
      width: 200px;

        }
      }
    `)
  }
}
