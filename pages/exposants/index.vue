<template>
  <main class="v-exposants">
    <template v-if="data && data.status === 'ok'">
      <section class="section">
        <h1 ref="titleRef" class="wave-title section-title" @mouseenter="distortTitle" @mouseleave="resetTitle">Exposants</h1>
      
      <!-- Liste des exposants -->
      <AppExposantsList v-if="data.result?.length" :exposants="data.result" />

        <div v-else>
          <p>Aucun exposant pour le moment.</p>
        </div>
      </section>
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
import { ref, onMounted } from 'vue'

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

const titleRef = ref<HTMLElement>()
let titleChars: HTMLElement[] = []

onMounted(() => {
  if (!titleRef.value) return
  
  const element = titleRef.value
  const originalText = element.textContent || ''
  
  // Créer les spans pour chaque lettre
  element.innerHTML = originalText
    .split('')
    .map((char) => {
      if (char === ' ') {
        return `<span class="wave-char space">&nbsp;</span>`
      }
      return `<span class="wave-char">${char}</span>`
    })
    .join('')
  
  // Récupérer tous les caractères
  titleChars = Array.from(element.querySelectorAll('.wave-char'))
})

const distortTitle = () => {
  titleChars.forEach((char) => {
    if (char.classList.contains('space')) return
    
    const randomX = (Math.random() * 10 - 5).toFixed(1)
    const randomY = (Math.random() * 8 - 4).toFixed(1)
    const randomRotate = (Math.random() * 12 - 6).toFixed(1)
    
    char.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`
    char.style.transition = 'transform 0.3s ease'
  })
}

const resetTitle = () => {
  titleChars.forEach((char) => {
    char.style.transform = 'translate(0px, 0px) rotate(0deg)'
  })
}
</script>

<style lang="scss" scoped>
.wave-title {
  cursor: pointer;
  
  :deep(.wave-char) {
    display: inline-block;
    position: relative;
    
    &.space {
      width: 0.3em;
    }
  }
}
</style>