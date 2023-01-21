
const RecipeCard = (props) => {
  const { id, name, photo } = props.recipe
  const tags = props.recipe.tags || []
  return (
    <div class="recipe" onclick={() => props.$router.push(`/recipe/${id}`)}>
      <p><span class="recipe-name">{name}</span></p>
      {photo
        ? (
          <div class="photo-link-container">
            <img onclick={() => props.$router.push(`/recipe/${id}`)} class="recipe-photo-link" src={photo} />
          </div>
        )
        : null}
      {(tags?.length > 0)
        ? (<div class="tags-box">
          Tags: {tags.map(tag => {
            return (
              <span class="tag" onclick={() => props.findTag(tag)}>{tag}</span>
            )
          })}
        </div>)
        : null
      }
    </div>
  )
}

export default RecipeCard
