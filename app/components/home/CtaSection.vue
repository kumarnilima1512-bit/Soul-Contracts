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
  <section id="contact" ref="el" class="reveal bg-[#1E1424] py-20 px-6 text-center">
    <h2 class="font-serif text-3xl md:text-4xl text-[#F7F1E8] mb-4">
      Ready to See What the Cards Reveal?
    </h2>
    <p class="text-[#C9BFAF] text-sm mb-8">
      Book a one-on-one tarot session and get personalized insight into your journey.
    </p>
    <a href="mailto:hello@soulcontracts.com" class="inline-flex items-center gap-2 bg-[#D9A65C] text-[#1E1424] font-medium px-8 py-3 rounded-full text-sm hover:bg-[#c99648] transition-colors duration-200">
  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 10h18" />
  </svg>
  Book a Reading
</a>
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