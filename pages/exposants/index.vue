<template>
  <main class="v-exposants">
    <template v-if="data && data.status === 'ok'">
      <h1>Exposants</h1>
      
      <!-- Liste des exposants -->
      <AppExposantsList v-if="data.result?.length" :exposants="data.result" />

      <div v-else>
        <p>Aucun exposant pour le moment.</p>
      </div>
    </template>

    <template v-else-if="status === 'error'">
      <div class="error">Erreur de chargement des exposants</div>
    </template>

    <template v-else>
      <div class="loading">Chargement...</div>
    </template>
  </main>
</template>

<script setup lang="ts">
import type { ExposantData, CMSListData } from '~/composables/cms_api'

const { data, status } = await useFetch<CMSListData<ExposantData>>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: "site.find('exposants').children()",
    select: {
      title: true,
      slug: true,
      content_subtitle: true,
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
</script>

<style lang="scss" scoped>
</style>