<template>
  <article class="exposant-detail">
    <!-- Nom du participant -->
    <h1 class="exposant-name">{{ exposant.title }}</h1>
    
    <!-- Sous-titre -->
    <h2 v-if="exposant.content_subtitle" class="exposant-subtitle">
      {{ exposant.content_subtitle }}
    </h2>
    
    <!-- Contenu principal -->
    <div v-if="exposant.content_body" class="exposant-content" v-html="exposant.content_body"></div>
    
    <!-- Description technique -->
    <div v-if="exposant.content_descriptif" class="exposant-descriptif">
      <h3>DESCRIPTIF</h3>
      <div v-html="exposant.content_descriptif"></div>
    </div>
    
    <!-- Boutons d'action -->
    <div class="action-buttons">
      <AppButton 
        v-if="exposant.info_bio_studio" 
        text="Bio" 
        @click="openBioModal"
      />
      
      <AppButton 
        v-if="exposant.info_link_website" 
        text="Site web" 
        @click="openWebsite"
      />
      
      <AppButton 
        v-if="exposant.info_link_social" 
        text="Instagram" 
        @click="openInstagram"
      />
    </div>
    
    <!-- Modal Bio -->
    <AppBioModal 
      v-if="showBioModal" 
      :bio-text="exposant.info_bio_studio" 
      @close="closeBioModal" 
    />
  </article>
</template>

<script setup lang="ts">
import type { ExposantData } from '~/composables/cms_api'

interface Props {
  exposant: ExposantData
}

const props = defineProps<Props>()

const showBioModal = ref(false)

const openBioModal = () => {
  showBioModal.value = true
}

const closeBioModal = () => {
  showBioModal.value = false
}

const openWebsite = () => {
  if (props.exposant.info_link_website) {
    window.open(props.exposant.info_link_website, '_blank')
  }
}

const openInstagram = () => {
  if (props.exposant.info_link_social) {
    window.open(props.exposant.info_link_social, '_blank')
  }
}
</script>

<style lang="scss" scoped>
</style>