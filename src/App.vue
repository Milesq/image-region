<script lang="ts">
import { defineComponent } from 'vue'

import ShowRegion from './components/ShowRegion.vue'
import Region from './common/Region'

const isDev = import.meta.env.DEV

export default defineComponent({
  data: () => ({
    imageUrl: isDev ? 'https://picsum.photos/600' : '',
    regionText: isDev ? '10 10 50 50' : '',
  }),
  computed: {
    region() {
      const coords = this.regionText.split(/\s/).filter(Boolean).map(Number)

      if (!Region.isProperRegion(coords)) {
        return
      }

      return new Region(...coords)
    },
  },
  components: {
    ShowRegion,
  },
})
</script>

<template>
  <div class="wrapper">
    <input type="text" v-model="imageUrl" />
    <textarea cols="30" rows="10" v-model="regionText" />
  </div>

  <ShowRegion v-if="region && imageUrl" :imageUrl="imageUrl" :region="region" />
</template>

<style scoped>
.wrapper {
  display: inline-flex;
  flex-direction: column;
}
</style>
