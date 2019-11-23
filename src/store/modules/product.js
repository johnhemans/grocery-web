import ProductAPI from '../../api/product.api.js'

const state = {
  products: {
    woolworths: [],
    coles: []
  }
}

const getters = {
  allProducts: state => state.products,
  woolworthsProducts: state => state.products.woolworths,
  colesProducts: state => state.products.coles
}

const mutations = {
  setWoolworthsProducts (state, payload) {
    state.products.woolworths = payload
  },
  setColesProducts (state, payload) {
    state.products.coles = payload
  }
}

const actions = {
  async getWoolworthsProducts ({ commit }, payload) {
    try {
      var response = await ProductAPI.GetWoolworthsProducts(payload)

      commit('setWoolworthsProducts', response.data.Products)

      return response
    } catch (err) {
      throw err
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}