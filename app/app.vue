<!-- app.vue -->
<script setup lang="ts">
const router = useRouter()

router.options.scrollBehavior = (to, from, savedPosition) => {
  if (to.hash) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          el: to.hash,
          top: 80, // navbar height offset
          behavior: 'smooth',
        })
      }, 300) // page transition/mount wait
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
    <NuxtPage />
  </NuxtLayout>
</template>