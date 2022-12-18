
export default class RecipeEditor {
  name = 'recipe-editor'

  render() {
    return (
      <div class="recipe-editor">
        <div class="recipe-edit-form">
          <span><label for="name">Name:</label>
          <input type="text" class="recipe-edit-input" v-model="recipeEdit.name" :placeholder="recipe.name"/></span>
          <span style="font-weight: 400">Finished recipe photo:</span>
          <div v-if="!recipeEdit.photo">
            <input type="file" onchange="onPhotoChange">
          </div>
          <div v-else>
            <img class="box-img" src={recipeEdit.photo}/>
            <button onclick="removeRecipePhoto">Remove image</button>
          </div>
          <span>
            <label for="ingredients">
              Ingredients:
            </label>
            <input
              type="text"
              class="recipe-edit-input"
              oninput={(e) => this.newIngredient.text = e.target.value}
              placeholder="e.g. eggs, flour, etc"/>
              <button class="blackbtn" onclick={() => this.addIngredient()}>
                add
              </button>
            </span>
          <div class="ingredients">
            <draggable :list="recipeEdit.ingredients" onchange="ingrChange" :options="{draggable: '.recipe-ingr', animation: 200}">
              <div class="recipe-ingr" v-for="(ingredient, index) in recipeEdit.ingredients" :key="index">
                <span class="remove" onclick="removeIngr(index)">x</span> {{ ingredient.text }}
              </div>
            </draggable>
          </div>
          <label for="instructions">Directions:</label>
          <div class="instructions">
            <draggable :list="recipeEdit.instructions" :options="{draggable:'.recipe-text', animation: 200}" onchange="change">
              <div v-for="(box, index) in recipeEdit.instructions" class="recipe-text" :key="index">
                <div class="box-item" v-if="editId !== box.id && box.hasImage === false"><span v-html="box.text">
                  </span>
                  <span class="box-item-buttons"><button class="box-edit" onclick="editBoxText(box.id)">edit</button><button class="box-edit" onclick="remove(index)">x
                  </button></span>
                </div>
                <div class="box-item" v-if="editId !== box.id && box.hasImage === true"><img class="box-img" :src="box.image" /> <br /><br />
                  <span class="box-item-buttons"><button class="box-edit" onclick="editTrue(box.id)">edit</button><button class="box-edit" onclick="remove(index)">x
                  </button></span>
                </div>
                <div class="box-edit-item" v-if="editing === true && editId === box.id && box.hasImage === false">
                  <ckeditor :editor="editor" v-model="boxText" :config="editorConfig" @input="checkEditText"></ckeditor>
                  <br /><br />
                  <span class="lil-buttons"><button v-if="editText" onclick="editBox(box.id)" class="box-edit">save changes</button> <button class="box-edit" onclick="cancel">cancel</button></span>
                </div>
                <div class="box-edit-item" v-if="editing === true && editId === box.id && box.hasImage === true">
                  <div v-if="!editImg">
                    <img class="box-img" v-bind:src="box.image"/>
                  </div>
                  <div v-else>
                    <img class="box-img" v-bind:src="editImg"/>
                  </div>
                  <input type="file" onchange="onImgChange">
                  <br />
                  <span><button v-if="editImg" onclick="editImage(box.id)" class="box-edit">save changes</button> <button class="box-edit" onclick="cancel">cancel</button></span>
                </div>
                <br />
              </div>
            </draggable>
            <div v-if="editing === false">
              <div class="new-box">
                <div class="new-box-text-cover" onclick="showText" v-if="itemChosen === false">
                  <p>
                    add text
                  </p>
                </div>
                <div class="new-box-text" v-if="text === true && itemChosen === true">
                  <ckeditor :editor="editor" v-model="newBoxText" :config="editorConfig"></ckeditor>
                  <span class="lil-buttons">
                  <button class="box-img-buttons" v-if="newBoxText" onclick="addText">add text</button>
                  <button class="box-img-buttons" v-if="itemChosen === true" onclick="backToSelection">back
                  </button>
                  </span>
                  <p style="color: red">{{ textError }}</p>
                </div>
                <div class="new-box-img-cover" onclick="showImage" v-if="itemChosen === false">
                  <p>
                    add image
                  </p>
                </div>
                <div class="new-box-img" v-if="itemChosen === true && text === false">
                  <div v-if="!newBoxImg">
                    <p style="font-weight: 400">
                      Choose an image:
                    </p>
                    <input type="file" onchange="onFileChange">
                  </div>
                  <div v-else>
                    <img class="box-img" v-bind:src="newBoxImg"/>
                    <button onclick="removeImage">Remove image</button>
                  </div>
                </div>
              </div>
              <div v-if="itemChosen === true && text === false">
                <button class="box-img-buttons" v-if="newBoxImg" onclick="addImage">add image</button> <button class="box-img-buttons" v-if="itemChosen === true" onclick="backToSelection">back
                </button>
                <p>
                  <span style="color: red">{{ imgError }}</span>
                </p>
              </div>
            </div>
          </div>
          <span><label for="tags">Tags:</label> <input type="text" id="tag" class="recipe-edit-input" v-model="newTag" placeholder="e.g. dinner, holiday, etc"/> <button class="blackbtn" onclick="addTag">add tag</button></span>
          <p>
          <ul class="tag-ul">
            <li v-for="(tag, index) in recipeEdit.tags">
              <span class="remove" onclick="removeTag(index)">x</span> <span class="tag-text">{{ tag }}</span>
            </li>
          </ul>
          </p>
          <span class="btnsrow">
          <span class="item1">
          <button class="pinkbtn" onclick="editRecipe(recipe)">save changes</button></span>
          <span class="item2">
          <button class="delete-btn" onclick="deleteRecipe(recipe._id)">delete recipe</button>
          </span>
          </span>
        </div>
      </div>
    )
  }
}
