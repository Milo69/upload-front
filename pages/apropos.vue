<template>
  <main class="v-apropos">
    <template v-if="data && data.status === 'ok'">
      
      <!-- Section Biennale -->
      <section v-if="data.result" class="biennale-section">
        
        <div class="biennale-container">
          <!-- Contenu -->
          <div class="biennale-content">
            <h1 v-if="data.result.biennale_title">{{ data.result.biennale_title }}</h1>
            <div v-if="data.result.biennale_description" 
                 v-html="data.result.biennale_description" 
                 class="biennale-description"></div>
          </div>
        </div>
        
        <!-- Crédits et Commissariat -->
        <div class="credits-section">
          <div v-if="data.result.commissariat_block1" class="credits">
            <div v-html="data.result.commissariat_block1" class="credits-content"></div>
          </div>
          
          <div v-if="data.result.commissariat_block2" class="commissariat">
            <div v-html="data.result.commissariat_block2" class="commissariat-content"></div>
          </div>
        </div>
      </section>

      <!-- Section Partenaires -->
      <section v-if="data.result?.partners_title" class="partners-section">
        <h2>{{ data.result.partners_title }}</h2>
        <div v-if="data.result.partners_text" 
             v-html="data.result.partners_text" 
             class="partners-text"></div>

                     <!-- Image -->
        <div v-if="data.result.biennale_image">
          <img :src="'http://localhost:8000' + data.result.biennale_image" alt="Image de la biennale" />
        </div>
             
        <!-- Logos des partenaires (temporairement masqué) -->
        <!--<div v-if="data.result.partners_logos?.length" class="partners-logos">
          <img v-for="logo in data.result.partners_logos" 
               :key="logo.alt" 
               :src="logo.small" 
               :alt="logo.alt" 
               class="partner-logo" />
        </div>-->
      </section>

    </template>

    <template v-else-if="status === 'error'">
      <div class="error">Erreur de chargement de la page À propos</div>
    </template>

    <template v-else>
      <div class="loading">Chargement...</div>
    </template>
  </main>
</template>

<script setup lang="ts">
import type { AproposData, CMSFetchData } from '~/composables/cms_api'

const { data, status } = await useFetch<CMSFetchData<AproposData>>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: "site.find('apropos')",
    select: {
      title: true,
      slug: true,
      biennale_title: true,
      biennale_description: true,
      commissariat_block1: true,
      commissariat_block2: true,
      biennale_image: "page.biennale_image.toFile.url",
      partners_title: true,
      partners_text: true
    }
  }
})
</script>

<style lang="scss" scoped>
</style>