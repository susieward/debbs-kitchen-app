import { Api } from '@/api/api'

class TextBox {
  name = 'text-box'
  state = () => ({
    editText: ''
  })

  static get observedAttributes() {
    return ['boxText']
  }

  render() {
    return (
      <div class="box-edit-item">
        <textarea
          oninput={(e) => this.editText = e.target.value}>
          {this.boxText}
        </textarea>
        <br /><br />
        <span class="lil-buttons">
          <button
            onclick={() => this.$emit('save', this.editText)}
            class="box-edit">
            save changes
          </button>
          <button class="box-edit" onclick={() => this.$emit('cancel')}>
            cancel
          </button>
        </span>
      </div>
    )
  }
}

export default class RecipeInstructions {
  name = 'recipe-instructions'
  components = { TextBox }
  state = () => ({
    instructions: [],
    newBox: {
      text: '',
      id: '',
      image: '',
      hasImage: false,
      order: undefined
    },
    newBoxText: '',
    newBoxImg: '',
    boxText: '',
    editText: '',
    imgError: '',
    textError: '',
    text: false,
    image: false,
    itemChosen: false,
    testIndex: undefined,
    testId: '',
    editImg: '',
    editId: '',
    adding: false
  })

  static get observedAttributes() {
    return ['editing', 'recipe-id']
  }

  async createdCallback() {
    if (this['recipe-id']) {
      this.getInstructions()
    }
  }

  render() {
    return (
      <div>
        <span class="section-title">Instructions:</span>
        <div style="margin-top: 10px">
          {this.editing ? this.editor : this.list}
        </div>
      </div>
    )
  }

  get list() {
    return (
      <map-items
        class="recipe-directions"
        items={this.instructions}
        data-for={(item, index) => {
            const text = <div class="directions-text"></div>
            text.innerText = item.text
            return (
              <div class="recipe-direction">
                {text}
                <div data-if={item.hasImage} class="recipe-box-img-container">
                  {item.hasImage ? <img class="recipe-box-img" src={item.image} /> : null}
                </div>
              </div>
            )
          }}>
        </map-items>
    )
  }

  get editor() {
    return (
      <div>
      <div class="recipe-directions">
        {this.instructions.map((item, index) => {
          const text = <div></div>
          text.innerText = item.text
            return (
              <div class="recipe-text">
              {this.editId == item.id
                ? (
                  <text-box
                    boxText={this.boxText}
                    onsave={(e) => this.editBox(e.detail)}
                    oncancel={() => this.cancel()}>
                  </text-box>
                )
                : (
                  <div class="box-item">
                    {text}
                    <span class="box-item-buttons">
                      <button class="box-edit" onclick={() => this.editBoxText(item.id)}>
                        edit
                      </button>
                      <button class="box-edit" onclick={() => this.remove(index)}>
                        x
                      </button>
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {this.adding
          ? (
            <div class="new-box">
            <text-box
              boxText={this.newBoxText}
              onsave={(e) => this.addText(e.detail)}
              oncancel={() => this.cancel()}>
            </text-box>
            </div>
          )
          : null}
        <div class="new-box">
          <div class="new-box-text-cover" onclick={() => this.adding = true}>
            <p>add text</p>
          </div>
      </div>
      </div>
    )
  }

  async getInstructions() {
    const id = this['recipe-id']
    try {
      const data = await Api.$instructions.getByRecipeId(id)
      console.log(data)
      this.instructions = data
    } catch (err) {
      console.error(err)
    }
  }

  async addText(newText) {
    if (newText) {
      const order = this.instructions.length + 1
      this.newBox.text = newText
      this.newBox.order = order
      await this.save({
        text: newText,
        order,
        recipe_id: this['recipe-id']
      })
      /*
      this.instructions.push(this.newBox)
      console.log(this.instructions)
      this.newBox = {}
      this.itemChosen = false
      this.text = false
      this.newBoxText = ''
      // this.$emit('update', this.instructions)
      */
      this.adding = false
      // this.addIndex()
      
    } else {
      this.textError = "Text field cannot be blank"
    }
  }

  async save(data) {
    try {
      const res = await Api.$instructions.create(data)
      console.log(res)
      if (res) {
        await this.getInstructions()
      }
    } catch (err) {
      console.error(err)
    }
  }

  addImage() {
    if (this.newBoxImg) {
      var number = Date.now() + Math.random().toString().slice(18)
      var id = 'a' + number
      this.newBox.id = id
      this.newBox.hasImage = true
      this.newBox.image = this.newBoxImg
      this.recipeEdit.instructions.push(this.newBox)
      this.newBox = {}
      this.newBoxImg = ''
      this.itemChosen = false
      this.image = false
      // this.addIndex()
    } else {
      this.imgError = "Please select an image"
    }
  }

  addIndex() {
    this.recipeEdit.instructions.map((item, index) => {
      return item.order = index
    })
  }

  change(evt) {
    var i = evt.moved.newIndex
    this.testIndex = i
    var e = evt.moved.element
    this.testId = e.id
    this.recipeEdit.instructions.forEach((item, index) => {
      item.order = index
    })
  }

  editTrue(id) {
    this.editId = id
  }

  editBoxText(id) {
    this.editId = id
    var box = this.instructions.find(b => b.id === id)
    this.boxText = box.text
  }

  checkEditText() {
    this.editText = this.boxText
  }

  editBox(newText) {
    var index = this.instructions.findIndex(b => b.id === this.editId)
    var box = this.instructions.find(b => b.id === this.editId)
    var updatedBox = {
      text: newText,
      id: boxId,
      image: box.image,
      hasImage: false,
      order: box.order
    }
    this.instructions.splice(index, 1, updatedBox)
    this.$emit('update', this.instructions)
    this.editId = ''
    this.editText = ''
    this.boxText = ''
  }

  cancel(){
    this.editId = ''
    this.editText = ''
    this.boxText = ''
    if (this.adding) this.adding = false
  }

  remove(index){
    this.instructions.splice(index, 1)
    this.$emit('update', this.instructions)
    /*
    this.recipeEdit.instructions.forEach((item, index) => {
      item.order = index
    })
    */
  }

  get _editor() {
    return (
      <>
      <draggable-list
        list={this.instructions}
        options="{draggable:'.recipe-text', animation: 200}"
        onchange={() => this.change()}>

        <div class="recipe-text">
          <div class="box-item" v-if="editId !== box.id && box.hasImage === false">
            <span v-html="box.text">
            </span>
            <span class="box-item-buttons">
              <button class="box-edit" onclick="editBoxText(box.id)">
                edit
              </button>
              <button class="box-edit" onclick="remove(index)">x
            </button>
            </span>
          </div>

          <div class="box-item" v-if="editId !== box.id && box.hasImage === true">
          <img class="box-img" src="box.image" /> <br /><br />
            <span class="box-item-buttons">
              <button class="box-edit" onclick="editTrue(box.id)">
                edit
              </button>
              <button class="box-edit" onclick="remove(index)">x</button>
            </span>
          </div>

          <div class="box-edit-item" v-if="editing === true && editId === box.id && box.hasImage === false">
            <text-editor editor="editor" v-model="boxText" config="editorConfig" oninput="checkEditText"></text-editor>
            <br /><br />
            <span class="lil-buttons"><button v-if="editText" onclick="editBox(box.id)" class="box-edit">save changes</button> <button class="box-edit" onclick="cancel">cancel</button></span>
          </div>
          <div class="box-edit-item" v-if="editing === true && editId === box.id && box.hasImage === true">
            <div v-if="!editImg">
              <img class="box-img" src="box.image"/>
            </div>
            <div v-else>
              <img class="box-img" src={this.editImg}/>
            </div>
            <input type="file" onchange="onImgChange" />
            <br />
            <span><button v-if="editImg" onclick="editImage(box.id)" class="box-edit">save changes</button> <button class="box-edit" onclick="cancel">cancel</button></span>
          </div>
          <br />
        </div>
      </draggable-list>
      <div v-if="editing === false">
        <div class="new-box">
          <div class="new-box-text-cover" onclick="showText" v-if="itemChosen === false">
            <p>
              add text
            </p>
          </div>
          <div
            class="new-box-text"
            v-if="text === true && itemChosen === true">
            <text-editor editor="editor" v-model="newBoxText" config="editorConfig"></text-editor>
            <span class="lil-buttons">
            <button class="box-img-buttons" v-if="newBoxText" onclick="addText">add text</button>
            <button class="box-img-buttons" v-if="itemChosen === true" onclick="backToSelection">back
            </button>
            </span>
            <p style="color: red">{this.textError}</p>
          </div>
          <div class="new-box-img-cover" onclick="showImage" v-if="itemChosen === false">
            <p>
              add image
            </p>
          </div>
          <div class="new-box-img" data-if="itemChosen === true && text === false">
            <div data-if="!newBoxImg">
              <p style="font-weight: 400">
                Choose an image:
              </p>
              <input type="file" onchange={() => this.onFileChange()} />
            </div>
            <div v-else>
              <img class="box-img" src={this.newBoxImg} />
              <button onclick={() => this.removeImage()}>
                Remove image
              </button>
            </div>
          </div>
        </div>
        <div data-if="itemChosen === true && text === false">
          <button
            class="box-img-buttons"
            data-if="newBoxImg"
            onclick={() => this.addImage()}>
            add image
          </button>
          <button
            class="box-img-buttons"
            data-if="itemChosen === true"
            onclick={() => this.backToSelection()}>
            back
          </button>
          <p>
            <span style="color: red">{this.imgError}</span>
          </p>
        </div>
        </div>
        </>
    )
  }

  get styles() {
    return (`

      .recipe-directions {
        display: grid;
        align-content: flex-start;
        grid-auto-rows: auto;
        grid-gap: 15px;
      }

      .recipe-directions ul {
        list-style-type: none;
        padding: 0;
      }

      .recipe-direction {
        display: block;
        font-size: 18px;
        line-height: 30px;
      }


      .directions-text {

      }

      .directions-text p {
        line-height: 28px;
        margin: 0;
        padding: 0;
      }

      .recipe-text p {
        margin: 0;
        padding: 0;

      }

      .box-item {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto;
      background-color: #eee;
      padding: 20px;
      border: 1px solid transparent;
      border-radius: 6px;
      font-size: 16px;
      line-height: 28px;
      }

      .box-item:hover {
        cursor: pointer;
      }

      .box-item-buttons {
      display: grid;
      justify-content: flex-end;
      grid-template-columns: auto auto;
      grid-gap: 10px;
      }

      .photo-buttons {

      }

      .box-edit-item {
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto;
        background-color: #eee;
        padding: 20px;
        border: 1px solid transparent;
        border-radius: 6px;

      }

      .box-remove {
      border: none;
      background-color: #eee;
        color: #000;
      padding: 4px 6px;
      font-size: 14px;
      line-height: normal;
      max-height: 30px;
      cursor: pointer;
      }

      .box-edit {
        background-color: #aaa;
        border: 1px solid transparent;
        transition: 0.3s;
        border-radius: 4px;
        color: #fff;
        padding: 4px 6px;
        font-weight: 300;
        line-height: normal;
      font-size: 16px;
        cursor: pointer;
        max-height: 30px;

      }

      .box-edit:hover {
        background-color: #767676;
        border: 1px solid transparent;
        color: #fff;
      }

      .box-img-buttons {
        background-color: #aaa;
        border: 1px solid transparent;
        transition: 0.3s;
        border-radius: 4px;
        color: #fff;
        padding: 4px 6px;
        font-weight: 300;
        line-height: normal;
      font-family: 'Roboto';
      font-size: 16px;
        cursor: pointer;
        max-height: 30px;
    margin-right: 8px;
      }

      .box-img-buttons:hover {
        background-color: #767676;
        border: 1px solid transparent;
        color: #fff;
      }

      .new-box {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
      margin: 10px 0;
      }

      .new-box-text-cover {
      display: grid;
      background-color: #ddd;
      border: 1px solid #ddd;
      border-radius: 6px;
      width: auto;
      height: 100px;
      justify-content: center;
      align-content: center;
      cursor: pointer;
      transition: 0.2s;
      }

      .new-box-text-cover:hover {
        background-color: #848484;
        border: 1px solid #848484;
        color: #fff;
      }


    `)
  }
}
