
export default class RecipeEditor {
  name = 'recipe-editor'
  state = () => ({
    recipeName: '',
    photo: ''
  })

  watch = {
    recipeName: {
      handler(newVal) {
        this.$emit('updatename', newVal)
      }
    }
  }

  static get observedAttributes() {
    return ['recipe', 'editing']
  }

  createdCallback() {
    if (this.recipe.id) {
      this.photo = this.recipe.photo
    }
  }

  render() {
    return (
      <div>
        {this.editing ? this.editor : this.photoContainer}
      </div>
    )
  }

  get photoContainer() {
    return (
      <>
        {Boolean(this.recipe?.photo)
          ? (
            <div class="recipe-photo-container">
              <img class="recipe-photo" src={this.recipe.photo} />
            </div>
            )
          : null}
      </>
    )
  }

  get editor() {
    return (
      <div class="recipe-editor">
        <div class="recipe-edit-form">
          <span>
          <label for="name">Name:</label>
          <input
            type="text"
            class="recipe-edit-input"
            oninput={(e) => this.recipeName = e.target.value}
            value={this.recipe.name} />
          </span>
          <span>
            <label for="photo">Finished recipe photo: </label>
            <input name="photo" type="file" onchange={(e) => this.onPhotoChange(e)} />
          </span>
        </div>
      </div>
    )
  }

  get existingRecipe() {
    return Boolean(this.$route.params.id)
  }

  backToSelection() {
    this.itemChosen = false
    this.text = false
    this.image = false
    this.imgError = ''
    this.textError = ''
    this.newBoxText = ''
    this.newBoxImg = ''
  }
  onPhotoChange(e) {
    var files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    this.createPhoto(files[0])
  }
  createPhoto(file) {
    var image = new Image()
    var reader = new FileReader()
    reader.onload = (e) => {
      image.src = e.target.result
      image.setAttribute('class', 'box-img')
      this.$appendChild(image)
      this.$append(<button onclick={() => this.removeRecipePhoto()}>
        Remove image
      </button>)
      this.photo = e.target.result
    }
    reader.readAsDataURL(file)
  }
  removeRecipePhoto(e) {
    this.recipeEdit.photo = ''
  }
  onFileChange(e) {
    var files = e.target.files || e.dataTransfer.files
    if (!files.length)
      return
    this.createImage(files[0])
  }
  createImage(file) {
    var image = new Image()
    var reader = new FileReader()
    var vm = this
    reader.onload = (e) => {
      vm.image = e.target.result
      this.newBoxImg = vm.image
    }
    reader.readAsDataURL(file)
  }
  removeImage(e) {
    this.newBoxImg = ''
  }
  onImgChange(e) {
    var files = e.target.files || e.dataTransfer.files
    if (!files.length)
      return
    this.createEditImage(files[0])
  }
  createEditImage(file) {
    var image = new Image()
    var reader = new FileReader()
    var vm = this
    reader.onload = (e) => {
      vm.image = e.target.result
      this.editImg = vm.image
    }
    reader.readAsDataURL(file)
  }
  removeEditImage(e) {
    this.editImg = ''
  }
  onInput(value, index) {
    this.newText.text = value
    this.newText.order = index
    this.contentArray.push(this.newtext)
    this.newText = {}
  }

  get styles() {
    return (`
      .btnsrow {
        display: grid;
        grid-template-columns: auto auto;
        grid-column-gap: 10px;

      }

      .item1 {
        display: grid;
        justify-content: flex-start;
      }

      .item2 {
        display: grid;
        justify-content: flex-end;
      }

      .delete-draft {
        display: grid;
        justify-content: flex-end;
      }

      .draft-buttons {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 20px;
      justify-content: flex-start;
      }

      .recipe-editor {
        display: grid;
      }

          .recipe-edit-form {
            display: grid;
            grid-gap: 25px;
            align-content: flex-start;
            padding: 0 0 25px 0;
      }


      .recipe-edit-input{
          width: 200px;
          border: 1px solid #777;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 18px;
          font-family: 'Roboto';
          font-weight: 300;
          margin-left: 10px;
          margin-right: 5px;
          }




      .recipebtn {
      border: none;
          border: 1px solid #ddd;
          border-radius: 6px;
          background-color: #ddd;
          padding: 6px 10px;
          font-size: 16px;
          color: #444;
          cursor: pointer;
         max-width: 150px;
          }

          label {
            font-weight: 400;
          }

          .recipe-textarea {
          font-size: 16px;
          padding: 10px 12px;
          width: 100%;
          min-height: 150px;
          border: 1px solid #777;
          border-radius: 8px;
          resize: none;

          }

          .box-img {
            width: 300px;
          }

          .new-box-img-cover {
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

          .new-box-img-cover:hover {
            background-color: #848484;
            border: 1px solid #848484;
            color: #fff;
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
          line-height: 25px;
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
          font-family: 'Roboto';
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


          .remove {
                  color: #e50000;
                  font-size: 18px;
                  margin-right: 5px;
                  padding: 2px;
                  cursor: pointer;
              }



              .remove:hover {
              color: #000;
              }

              .tag-ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
              }

              .tag-ul li {
                display: inline-block;
                margin-right: 20px;
              }

              .tag-text {

                color: #F08080;
                border-bottom: 1px solid #ddd;
                padding-bottom: 2px;
                cursor: pointer;
                font-size: 18px;
                }

            .tag-text:hover {
                color: #000;
            }

            @media screen and (max-width: 1000px){

              .recipe-editor {
                width: auto;
              }

              .new-box-text {
                width: 500px;
              }
            }

            @media screen and (max-width: 766px){

              .recipe-editor {
                width: auto;
              }

              .new-box-text {
                width: 500px;
              }
            }


            @media screen and (max-width: 590px){
              .new-box-text  {
                width: 370px;
              }
            }


            @media screen and (max-width: 400px){
              .new-box-text  {
                width: 300px;
              }
            }
    `)
  }
}
