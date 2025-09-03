
// CMI_API_Response: Ce type est une enveloppe de base pour toutes les réponses du CMS.
// Il permet de vérifier si la requête s'est bien passée (code = 200, status = "ok").
// Avant de lire les données, on regarde ces deux champs pour éviter les erreurs.

type CMS_API_Response = {
    code: number,
    status: 'ok' | string,
}

// Types pour les pages
export type HomeData = {
  title: string
  slug: string
  intro: string
}

export type ExposantData = {
  title: string
  slug: string
  content_subtitle: string
  content_body: string
  content_descriptif: string
  info_bio_studio: string
  info_link_website: string
  info_link_social: string
  info_image: Array<{
    url: string
    alt: string
    width: number
    height: number
  }>
}

export type EventData = {
  title: string
  slug: string
  date: string
  time: string
  address: string
  googlemaps: string
  description: string
  conditions: string
}

export type LieuData = {
  nom: string
  adresse: string
  maps?: string
}

export type AproposData = {
  title: string
  slug: string
  biennale_title: string
  biennale_description: string
  commissariat_block1: string
  commissariat_block2: string
  biennale_image: string
  partners_title: string
  partners_text: string
}

export type InfosPratiquesData = {
  title: string
  slug: string
  horaires: string
  lieu_biennale: LieuData[]
  autres_lieux: LieuData[]
  accessibilite: string
  contact_email: string
  instagram_label: string
  instagram_url: string
}

// Types génériques pour les réponses
export type CMSFetchData<T> = {
  status: 'ok' | 'error'
  message?: string
  result: T | null
}

export type CMSListData<T> = {
  status: 'ok' | 'error'
  message?: string
  result: T[]
}

export type CMSProgrammeData = {
  title: string
  slug: string
  children: EventData[]
}