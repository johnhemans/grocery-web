import axios from 'axios'

export default {
  GetWoolworthsProducts(searchTerm) {
    return axios.get(`https://500cowku20.execute-api.ap-southeast-2.amazonaws.com/develop/products?searchTerm=${searchTerm}`)
  }
}