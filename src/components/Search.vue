<template>
  <v-form @submit.prevent="handleSubmit">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="searchTerm"
            label="Search for Products"
            single-line
            outlined
            clearable
            :loading="loading"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <!--
    <v-container>
      <v-layout row wrap>
        <v-flex class="mb-5" sm12 md6 lg3 v-for="(product, index) in woolworthsProducts" :key="index">
          <card-product
            class="ma-3"
            :product="product.Products[0]"></card-product>
        </v-flex>
      </v-layout>
    </v-container>
    -->
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
//import CardProduct from './CardProduct.vue'

export default {
  name: 'Search',
  components: {
    //CardProduct
  },
  data () {
    return {
      searchTerm: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      woolworthsProducts: 'product/woolworthsProducts'
    })
  },
  methods: {
    ...mapActions({
      getWoolworthsProducts: 'product/getWoolworthsProducts'
    }),
    handleSubmit () {
      if (this.searchTerm) {
        this.loading = true
        this.getWoolworthsProducts(this.searchTerm)
          .finally(() => this.loading = false)
      }
    }
  }
};
</script>
