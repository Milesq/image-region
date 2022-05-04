<script setup lang="ts">
import { onMounted, ref, watchEffect} from 'vue'

import Region from '../common/Region'

const props = defineProps<{
  imageUrl: string
  region: Region
}>()

const img = ref<HTMLImageElement>()
const canvas = ref<HTMLCanvasElement>()
const ctxRef = ref<CanvasRenderingContext2D | null>()

onMounted(() => {
  ctxRef.value = canvas.value?.getContext('2d')
})

function updateCanvas() {
  const { value: ctx } = ctxRef

  if (!ctx) return

  ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height)

  ctx.strokeStyle = 'red'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.rect(...props.region.toArray())
  ctx.stroke()
}

function updateCanvasSize() {
  const { value: imgRef } = img
  const { value: canvasRef } = canvas

  if (!imgRef || !canvasRef) return

  canvasRef.width = imgRef.width
  canvasRef.height = imgRef.height

  watchEffect(updateCanvas)
}
</script>

<template>
  <div class="wrapper">
    <img ref="img" :src="imageUrl" @load="updateCanvasSize" />
    <canvas :width="img?.width" :height="img?.height" ref="canvas"></canvas>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
}

.wrapper > * {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
