<!-- app.vue -->
<script setup lang="ts">
const route = useRoute()
const router = useRouter()

router.options.scrollBehavior = (to, from, savedPosition) => {
  if (to.hash) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          el: to.hash,
          top: 80,
          behavior: 'smooth',
        })
      }, 300)
    })
  }
  if (savedPosition) {
    return savedPosition
  }
  return { top: 0 }
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage :page-key="route.fullPath" />
  </NuxtLayout>
</template>