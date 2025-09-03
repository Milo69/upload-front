<template>
  <main class="v-exposant-detail">
    <template v-if="data && data.status === 'ok' && exposant">
      
      <!-- Images -->
      <AppExposantImages 
        :images="exposant.info_image || []" 
        :exposant-name="exposant.title" 
      />
      
      <!-- Détails du participant -->
      <AppExposantDetail :exposant="exposant" />
      
      <!-- Bouton retour -->
      <div class="footer">
        <NuxtLink to="/exposants">← Retour aux exposants</NuxtLink>
      </div>

    </template>

    <template v-else-if="status === 'error' || !exposant">
      <div class="error">
        <h1>Exposant introuvable</h1>
        <p>Cet exposant n'existe pas ou n'est pas disponible.</p>
        <NuxtLink to="/exposants">← Retour aux exposants</NuxtLink>
      </div>
    </template>

    <template v-else>
      <div class="loading">Chargement...</div>
    </template>
  </main>
</template>

<script setup lang="ts">
import type { ExposantData, CMSFetchData } from '~/composables/cms_api'
const route = useRoute()
const slug = computed(() => route.params.slug as string)


const { data, status } = await useFetch<CMSFetchData<ExposantData>>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: `site.find("exposants").children().find("${slug.value}")`,
    select: {
      title: true,
      slug: true,
      content_subtitle: true,
      content_body: true,
      content_descriptif: true,
      info_bio_studio: true,
      info_link_website: true,
      info_link_social: true,
      info_image: {
        query: 'page.info_image.toFiles',
        select: {
          url: true,
          alt: true,
          width: true,
          height: true
        }
      }
    }
  }
})

const exposant = computed(() => data.value?.result ?? null)

</script>

<style lang="scss" scoped>
</style>