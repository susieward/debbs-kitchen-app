
const Recipe = (props) => {
  return (
    <div class="recipe" >
        <p onclick={() => props.$router.push(`/recipe/${props.recipe._id}`)}>
        <span class="recipe-name">{props.recipe.name}</span>
      </p>
        {props.recipe.photo
          ? (<div class="photo-link-container">
                <img onclick={() => props.$router.push(`/recipe/${props.recipe._id}`)} class="recipe-photo-link" src={props.recipe.photo} />
          </div>)
          : ''
        }
      <div class="tags-box">
        Tags: {props.recipe.tags.map(tag => {
          return (
            <span class="tag" onclick={() => props.findTag(tag)}>{tag}</span>
          )
        })}
        </div>
    </div>
  )
}

export default Recipe
