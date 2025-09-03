<template>
  <article class="exposant-card">
    <NuxtLink :to="`/exposants/${exposant.slug}`" class="card-link">
      <!-- Image -->
      <div class="image-container">
        <img 
          v-if="exposant.info_image?.length && exposant.info_image[0]"
          :src="'http://localhost:8000' + exposant.info_image[0].url" 
          :alt="exposant.info_image[0].alt || exposant.title" 
          class="exposant-image" 
        />
        <div v-else class="image-placeholder">
          Pas d'image
        </div>
      </div>
      
      <!-- Nom -->
      <h2 class="exposant-name">{{ exposant.title }}</h2>
      
      <!-- Sous-titre -->
      <p v-if="exposant.content_subtitle" class="exposant-subtitle">
        {{ exposant.content_subtitle }}
      </p>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { ExposantData } from '~/composables/cms_api'

interface Props {
  exposant: ExposantData
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
</style>