
export class CrudService {
  async $get(endpoint, id = null){
    try {
      let path = endpoint
      if(id){
        path = `${endpoint}/${id}`
      }
      const res = await fetch(path)
      return res.json()
    } catch(err){
      console.log('$get err', err)
      throw err
    }
  }
  async $create(endpoint, item){
    try {
      return await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(item)
      })
    } catch(err){
      console.log('createItem err', err)
      throw err
    }
  }
  async $update(endpoint, item, id){
    try {
      return await fetch(`${endpoint}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(item)
      })
    } catch(err){
      console.log('updateItem err', err)
      throw err
    }
  }
  async $delete(endpoint, id){
    try {
      return await fetch(`${endpoint}/${id}`, {
        method: 'DELETE'
      })
    } catch(err){
      console.log('deleteItem err', err)
      throw err
    }
  }
}
export const CrudApi = new CrudService()
