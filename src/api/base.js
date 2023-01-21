
export default class BaseApi {
  constructor(endpoint) {
    this.endpoint = endpoint
  }

  async getByRecipeId(recipeId) {
    try {
      const path = `${this.endpoint}s/${recipeId}`
      const data = await fetch(path)
      return data.json()
    } catch(err) {
      console.error(err)
      throw err
    }
  }

  async getList() {
    try {
      const path = `${this.endpoint}s`
      const data = await fetch(path)
      return data.json()
    } catch(err) {
      console.error(err)
      throw err
    }
  }

  async get(id) {
    try {
      const path = `${this.endpoint}/${id}`
      const data = await fetch(path)
      return data.json()
    } catch(err) {
      console.log('$get err', err)
      throw err
    }
  }

  async create(item) {
    try {
      return await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
    } catch(err){
      console.log('createItem err', err)
      throw err
    }
  }

  async update(item, id) {
    try {
      return await fetch(`${this.endpoint}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
    } catch(err) {
      console.log('updateItem err', err)
      throw err
    }
  }

  async delete(id) {
    try {
      return await fetch(`${this.endpoint}/${id}`, {
        method: 'DELETE'
      })
    } catch(err) {
      console.error(err)
      throw err
    }
  }
}
