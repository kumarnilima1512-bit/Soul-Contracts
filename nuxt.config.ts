// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules:['@nuxtjs/tailwindcss'],

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  
  runtimeConfig: {
    notionToken: process.env.NOTION_TOKEN,
    notionServicesDatabaseId: process.env.NOTION_SERVICES_DATABASE_ID,
    notionProfilesDatabaseId: process.env.NOTION_PROFILES_DATABASE_ID,
    notionCertificatesDatabaseId: process.env.NOTION_CERTIFICATES_DATABASE_ID,
    adminPassword: process.env.ADMIN_PASSWORD,
  },

  app: {
  head: {
    link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap' }]
  }
}

})
