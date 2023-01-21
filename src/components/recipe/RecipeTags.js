
export default class RecipeTags {
  name = 'recipe-tags'
  state = () => ({
    newTag: '',
    tags: []
  })

  watch = {
    tags: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
        this.$emit('update', newVal)
      }
    }
  }

  static get observedAttributes() {
    return ['editing', 'recipeTags']
  }

  createdCallback() {
    this.tags = [...this.recipeTags]
  }

  render() {
    return (
      <div class="tags-section">
        Tags:
          {this.tags.map((tag, index) => {
            return (
              <span>
              <span data-if={this.editing} class="remove" onclick={() => this.removeTag(index)}>
                x
              </span>
                <span class="tag">{tag}</span>
              </span>
            )
          })}
          {this.editing ? this.editor : null}
      </div>
    )
  }

  get editor() {
    return (
        <span>
        <input
          type="text"
          id="tag"
          class="recipe-edit-input"
          value={this.newTag}
          oninput={(e) => this.newTag = e.target.value}
          placeholder="e.g. dinner, holiday, etc"/>
          <button class="blackbtn" onclick={() => this.addTag()}>
            add tag
          </button>
        </span>
    )
  }

  addTag() {
    this.tags.push(this.newTag)
    this.newTag = ''
    //console.log(this.tags)
    //this.$emit('update', this.tags)
  }

  removeTag(index) {
    this.tags.splice(index, 1)
    //console.log(this.tags)
    //this.$emit('update', this.tags)
  }

  get styles() {
    return (`
      .tags-section {
        display: grid;
        grid-auto-flow: column;
        justify-content: flex-start;
        align-content: center;
        margin-top: 5px;
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
      `)
  }
}
