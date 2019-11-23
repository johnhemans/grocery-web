<template>
  <v-card
    class="card mx-auto"
    max-width="350px"
    min-height="450px">

    <v-img
      max-height="200px"
      contain
      :src="imgSrc"></v-img>

    <div class="card-title">
      <v-card-title>{{product.Name}} {{product.PackageSize}}</v-card-title>
    </div>

    <v-divider class="mx-4"></v-divider>

    <div class="card-content">
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <v-img height="30px" width="30px" src="/img/woolworths-logo.png"></v-img>
          </v-col>
          <v-col>
            <div class="d-flex flex-row">
              <span class="font-weight-black">${{product.Price}}</span>
              <strike class="ml-3" v-if="product.IsOnSpecial">${{product.WasPrice}}</strike>
            </div>
            <span v-if="product.CupString">{{product.CupString}}</span>
          </v-col>
          <v-col cols="2">
            <v-btn icon>
              <v-icon>mdi-playlist-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>


    <v-card-actions v-if="product.nutritionInfo">
      <v-btn
        text
        block
        @click="toggleNutrition">
        Nutrition Information
        <v-icon>{{ showNutrition ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    </div>

    <v-expand-transition v-if="product.nutritionInfo">
      <div v-show="showNutrition">
        <v-card-text>
          <v-list dense>
            <v-list-item>
              <v-list-item-content></v-list-item-content>
              <v-list-item-content class="text-center"><h4>Per Serve ({{product.nutritionInfo.servingInfo.size}})</h4></v-list-item-content>
              <v-list-item-content class="text-right"><h4>Per 100g</h4></v-list-item-content>
            </v-list-item>
            <v-list-item v-for="(val, index) in product.nutritionInfo.values" :key="index">
              <v-list-item-content><h4>{{ val.name }}:</h4></v-list-item-content>
              <v-list-item-content class="text-center"><span>{{ val.perServe }}</span></v-list-item-content>
              <v-list-item-content class="text-right"><span style="display: block; width: 5px;">{{ val.perQuantity }}</span></v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'CardProduct',
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      showNutrition: false
    }
  },
  computed: {
    imgSrc () {
      return this.product.MediumImageFile
    }
  },
  methods: {
    toggleNutrition () {
      this.showNutrition = !this.showNutrition
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-title {
    min-height: 100px;

    .v-card__title {
      word-break: break-word;
      text-transform: capitalize;
    }
  }

  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>