<template>
  <main class="v-exposant-detail">
    <template v-if="data && data.status === 'ok' && exposant">
      
      <div class="exposant-layout">
        <!-- Colonne de gauche : Détails du participant -->
        <div class="exposant-text-column">
          <AppExposantDetail :exposant="exposant" />
          
          <!-- Bouton retour -->
          <div class="footer">
            <NuxtLink to="/exposants">← Retour aux exposants</NuxtLink>
          </div>
        </div>
        
        <!-- Colonne de droite : Images -->
        <div class="exposant-image-column">
          <AppExposantImages 
            :images="exposant.info_image || []" 
            :exposant-name="exposant.title" 
          />
        </div>
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
.v-exposant-detail {
  padding: var(--space-xl) 2rem;

  @media (max-width: 768px) {
    padding: var(--space-xl) 1rem;
  }
}

.exposant-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xxl);
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
}

.exposant-text-column {
  display: flex;
  flex-direction: column;
}

.exposant-image-column {
  display: flex;
  flex-direction: column;
}

.footer {
  margin-top: var(--space-xl);
  padding-top: var(--space-l);
  border-top: 1px solid var(--color-black);
  
  a {
    color: var(--color-black);
    text-decoration: none;
    font-weight: bold;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.error, .loading {
  text-align: center;
  padding: var(--space-xl);
}
</style>