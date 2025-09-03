<template>
  <div v-if="images?.length" class="exposant-images">
    <div class="images-gallery">
      <img 
        v-for="image in images" 
        :key="image.url" 
        :src="'http://localhost:8000' + image.url" 
        :alt="image.alt || `Image de ${exposantName}`" 
        class="exposant-image"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface ImageData {
  url: string
  alt: string
  width: number
  height: number
}

interface Props {
  images: ImageData[]
  exposantName: string
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
</style>