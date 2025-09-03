<template>
  <main class="v-programme">
    <h1>Programme</h1>
    
    <template v-if="data && data.status === 'ok' && evenements?.length">
      <div class="events-list">
        <article 
          v-for="event in evenements" 
          :key="event.slug"
          class="event-card"
        >
          <NuxtLink :to="`/programme/${event.slug}`" class="event-link">
            <h2>{{ event.title }}</h2>
            
            <!-- Date et heure -->
            <div v-if="event.date || event.time" class="event-datetime">
              <span v-if="event.date" class="date">📅 {{ event.date }}</span>
              <span v-if="event.time" class="time">🕐 {{ event.time }}</span>
            </div>
            
            <!-- Lieu -->
            <div v-if="event.address" class="event-location">
              📍 {{ event.address }}
            </div>
            
            <!-- Description courte -->
            <div v-if="event.description" class="event-description" v-html="event.description"></div>
            
            <!-- Conditions -->
            <div v-if="event.conditions" class="event-conditions">
              <small>{{ event.conditions }}</small>
            </div>
          </NuxtLink>
        </article>
      </div>
    </template>

    <template v-else-if="status === 'error'">
      <div class="error">
        <h2>Erreur de chargement</h2>
        <p>Impossible de charger le programme.</p>
      </div>
    </template>

    <template v-else-if="evenements?.length === 0">
      <div class="empty">
        <h2>Aucun événement</h2>
        <p>Le programme n'est pas encore disponible.</p>
      </div>
    </template>

    <template v-else>
      <div class="loading">Chargement du programme...</div>
    </template>
  </main>
</template>

<script setup lang="ts">
import type { EventData, CMSProgrammeData, CMSFetchData } from '~/composables/cms_api'
const { data, status, error } = await useFetch<CMSFetchData<CMSProgrammeData>>('/api/CMS_KQLRequest', {
  lazy: true,
  method: 'POST',
  body: {
    query: 'site.find("programme")',
    select: {
      title: true,
      slug: true,
      children: {
        query: 'page.children().listed()',
        select: {
          title: true,
          slug: true,
          date: true,
          time: true,
          address: true,
          googlemaps: true,
          description: true,
          conditions: true
        }
      }
    }
  }
})

const evenements = computed(() => data.value?.result?.children ?? [])

// Debug et gestion d'erreur
watchEffect(() => {
  if (status.value === 'error') {
    console.warn('[CMS] Erreur de chargement du programme')
    console.warn('error:', error.value)
    console.warn('data:', data.value)
  }
})
</script>

<style lang="scss" scoped>
</style>