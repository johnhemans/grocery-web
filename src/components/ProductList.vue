<template>
  <v-container fluid>
    <v-data-iterator
      :items="products"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      hide-default-footer>
      <template v-slot:header>
        <v-toolbar
          dark
          color="blue"
          class="mb-1">
          <v-form @submit.prevent="handleSubmit">
            <v-text-field
              v-model="search"
              hide-details
              flat
              solo-inverted
              label="Search for Products"
              clearable
              :loading="loading">
            </v-text-field>
          </v-form>
          <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                label="Sort by"></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle
                v-model="sortDesc"
                mandatory>
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn
                  large
                  depressed
                  color="blue"
                  :value="true">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
        </v-toolbar>
      </template>
      <template v-slot:default="props">
        <v-layout row wrap>
          <v-flex class="mb-5" sm12 md6 lg4 xl3 v-for="(item, index) in props.items" :key="index">
            <card-product
              class="ma-3"
              :product="item"></card-product>
          </v-flex>
        </v-layout>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { formatNutrition } from '../helpers/woolworths-helper.js'

import CardProduct from './CardProduct.vue'

export default {
  name: 'ProductList',
  components: {
    CardProduct
  },
  data () {
    return {
      itemsPerPageArray: [4, 8, 12, 24],
      itemsPerPage: 24,
      page: 1,
      search: '',
      sortBy: 'Name',
      sortDesc: false,
      keys: [ 'Name', 'Price', 'Calories' ],
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      woolworthsProducts: 'product/woolworthsProducts'
    }),
    products () {
      let products = this.formatProducts(this.woolworthsProducts)
      if (products) {
        products = this.sortProducts(products)
      }
      return products
    }
  },
  methods: {
    ...mapActions({
      getWoolworthsProducts: 'product/getWoolworthsProducts'
    }),
    handleSubmit () {
      if (this.search) {
        this.loading = true
        this.getWoolworthsProducts(this.search)
          .finally(() => this.loading = false)
      }
    },
    formatProducts (products) {
      return products.map(x => {
        const product = x.Products[0]
        const nutritionString = product.AdditionalAttributes?.nutritionalinformation
        let nutritionInfo;
        if (nutritionString) {
          const info = JSON.parse(nutritionString)
          nutritionInfo = formatNutrition(info?.Attributes)
        }
        return { ...product, nutritionInfo }
      })
    },
    sortProducts (products) {
      switch (this.sortBy) {
        case 'Price':
           products = products.sort((a, b) => a[this.sortBy] - b[this.sortBy])
           break;
        case 'Name':
          products = products.sort((a, b) => a[this.sortBy].localeCompare(b[this.sortBy]))
          break;
        case 'Calories':
          products = products.sort((a, b) => {
            const aCalories = parseFloat(a.nutritionInfo?.values[0]?.perQuantity.match(/[0-9.]+kJ/gi)[0])
            const bCalories = parseFloat(b.nutritionInfo?.values[0]?.perQuantity.match(/[0-9.]+kJ/gi)[0])
            if (aCalories === bCalories) {
              return 0
            } else if (Number.isNaN(aCalories)) {
              return this.sortDesc ? -1 : 1
            } else if (Number.isNaN(bCalories)) {
              return this.sortDesc ? 1 : -1
            } else {
              return aCalories - bCalories
            }
          })
          break;
        default:
          break;
      }
      return this.sortDesc ? products.reverse() : products
    }
  }
}
</script>