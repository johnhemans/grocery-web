<template>
  <v-container>
    <v-list dense>
      <v-list-item v-for="attr in nutritionInfo.Attributes" :key="attr.Id">
        <v-list-item-content><h4>{{ attr.Name }}:</h4></v-list-item-content>
        <v-list-item-content class="text-left"><span>{{ attr.Value }}</span></v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: 'NutritionInfo',
  props: {
    nutritionInfo: {
      type: Object,
      default: null
    }
  }
}
</script>