export interface BannerItem {
  url: string
  urlImg: string
  text: string
}

export const bannerItems: BannerItem[] = [
  {
    url: '/',
    urlImg: '/assets/banner-index.webp',
    text: 'Bienvenido a casa!'
  },
  {
    url: '/eventos',
    urlImg: '/assets/banner-index.webp',
    text: 'Eventos!'
  },
  {
    url: '/ministerios',
    urlImg: '/assets/banner-index.webp',
    text: 'Ministerios de la congregación!'
  },
  {
    url: '/predicas',
    urlImg: '/assets/banner-index.webp',
    text: 'Prédicas de YouTube!'
  },
  {
    url: '/contacto',
    urlImg: '/assets/banner-index.webp',
    text: 'Encuentranos!'
  }
]
