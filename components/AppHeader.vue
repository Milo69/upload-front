<template>
  <header class="app-header">
    <div class="header-content">
      <!-- Logo (à gauche, plus petit) -->
      <NuxtLink to="/" class="logo-link">
        <img src="/img/Logo_Upload-Web.svg" alt="Upload Logo" class="logo" />
      </NuxtLink>
      
      <!-- Bloc texte de la biennale (au centre, 3 lignes en h4) -->
      <div class="biennale-info">
        <h4>Biennale de design graphique</h4>
        <h4>Plan-les-Ouates x HEAD – Genève</h4>
        <h4>4.10 – 7.11.2025</h4>
      </div>
      
      <!-- Navigation (à droite) -->
      <nav class="main-navigation">
        <h3><NuxtLink to="/exposants" class="nav-link">Exposants</NuxtLink></h3>
        <h3><NuxtLink to="/programme" class="nav-link">Programme</NuxtLink></h3>
        <h3><NuxtLink to="/apropos" class="nav-link">À propos</NuxtLink></h3>
        <h3><NuxtLink to="/infos-pratiques" class="nav-link">Infos pratiques</NuxtLink></h3>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const navLink1 = ref<HTMLElement>()
const navLink2 = ref<HTMLElement>()
const navLink3 = ref<HTMLElement>()
const navLink4 = ref<HTMLElement>()

let navChars: HTMLElement[][] = [[], [], [], []]

onMounted(() => {
  const navLinks = [navLink1.value, navLink2.value, navLink3.value, navLink4.value]
  
  navLinks.forEach((link, index) => {
    if (!link) return
    
    const originalText = link.textContent || ''
    
    // Créer les spans pour chaque lettre
    link.innerHTML = originalText
      .split('')
      .map((char) => {
        if (char === ' ') {
          return `<span class="nav-char space">&nbsp;</span>`
        }
        return `<span class="nav-char">${char}</span>`
      })
      .join('')
    
    // Récupérer tous les caractères pour ce lien
    navChars[index] = Array.from(link.querySelectorAll('.nav-char'))
  })
})

</script>


<style lang="scss" scoped>
.app-header {
  background-color: white;
  border-bottom: 2px solid black;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1800px;
  margin: 0 auto;
}

.logo-link {
  flex-shrink: 0;
}

.logo {
  height: 43px;
  width: auto;
}

.biennale-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  
  // Les h4 héritent automatiquement des styles du main.scss
  h4 {
    margin: 0;
  }
}

.main-navigation {
  display: flex;
  gap: 1.5rem;
  flex-shrink: 0;
  
  h3 {
    margin: 0;
    font-family: 'Helvetica', Arial, sans-serif;
    font-weight: bold;
    font-size: clamp(1.3rem, 5vw, 1.2rem);
    line-height: 1.3;
    color: black;
  }
}

.nav-link {
  color: inherit;
  text-decoration: none;
  display: inline-block;
  position: relative;
  
  // Si lien actif, garde l'effet de distorsion permanent
  &.router-link-active {
    font-weight: bold;
    
    .distort-char {
      transform: translate(var(--random-x), var(--random-y)) rotate(var(--random-rotate));
    }
  }
}

.nav-wave {
  :deep(.nav-char) {
    display: inline-block;
    position: relative;
    
    &.space {
      width: 0.3em;
    }
  }
}

@media (max-width: 1024px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .biennale-info {
    margin-left: 1rem;
    text-align: center;
  }
  
  .main-navigation {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .main-navigation {
    gap: 0.75rem;
  }
  
  .logo {
    height: 35px;
  }
  
  .biennale-info {
    margin-left: 0.5rem;
  }
}
</style>