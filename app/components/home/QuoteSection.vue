<script setup lang="ts">
const el = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )
  if (el.value) observer.observe(el.value)
})
</script>

<template>
  <section id="about" ref="el" class="reveal bg-[#F3EBFA] py-16 px-6">
    <div class="max-w-3xl mx-auto text-center">
      <span class="text-3xl text-[#C9A46A]">✦</span>
      <p class="font-serif text-xl md:text-2xl text-[#4A4358] mt-4 leading-relaxed">
        "The cards don't predict your fate — they reflect the choices
        already stirring within you."
      </p>
      <p class="text-sm text-[#8C6FB0] mt-4 tracking-wide">— 8+ Years of Tarot Practice</p>
    </div>
  </section>
</template>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>