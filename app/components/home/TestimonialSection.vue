<script setup lang="ts">
const testimonials = [
  { quote: 'My reading gave me so much clarity about my path. I feel more confident and at peace now. Highly recommended!', name: 'Priya S.', rating: 5 },
  { quote: 'The insights were so accurate and comforting. I always found the guidance I needed. Truly a blessing!', name: 'Rohan D.', rating: 5 },
  { quote: 'The reading was deeply personal and helped me see things from a new perspective. Thank you!', name: 'Ananya M.', rating: 5 },
]

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
  <section id="testimonials" ref="el" class="reveal bg-[#F7F1E8] py-20 px-6">
    <div class="max-w-6xl mx-auto text-center">
      <h2 class="font-serif text-3xl md:text-4xl text-[#1E1424] mb-2">What My Clients Say</h2>
      <p class="text-sm text-[#6B6270] mb-12">Real stories. Real guidance. Real transformation.</p>

      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="t in testimonials"
          :key="t.name"
          class="bg-white border border-[#E8DED0] rounded-2xl p-6 text-left"
        >
          <p class="text-sm text-[#4A4358] leading-relaxed mb-4">“{{ t.quote }}”</p>
          <p class="text-[#D9A65C] text-sm mb-1">
            <span v-for="n in t.rating" :key="n">★</span>
          </p>
          <p class="text-xs text-[#8C7A9C]">— {{ t.name }}</p>
        </div>
      </div>
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