<script setup lang="ts">
const services = [
  { title: 'Love & Relationships', desc: 'Understand your emotions, relationships and future path in love.', icon: '♡' },
  { title: 'Career & Finance', desc: 'Get clarity on your career, job changes, financial growth and opportunities.', icon: '💼' },
  { title: 'Health & Wellbeing', desc: 'Find balance, reduce stress and improve your overall wellbeing.', icon: '❁' },
  { title: 'Life Guidance', desc: "Gain clarity on your life's purpose, decisions and next steps.", icon: '✧' },
  { title: 'Yes / No Reading', desc: 'Get quick answers to your pressing questions.', icon: '☽' },
]

const sectionEl = ref<HTMLElement | null>(null)
const cardEls = ref<HTMLElement[]>([])
const addCardEl = (el: any) => {
  if (el && !cardEls.value.includes(el)) cardEls.value.push(el)
}

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
  if (sectionEl.value) observer.observe(sectionEl.value)
  cardEls.value.forEach((el) => observer.observe(el))
})
</script>

<template>
  <section id="services" class="bg-[#F7F1E8] py-24 px-6">
    <div class="max-w-6xl mx-auto">
      <div ref="sectionEl" class="reveal text-center mb-14">
        <p class="text-[#D9A65C] text-sm mb-3">✦ ✦ ✦</p>
        <h2 class="font-serif text-3xl md:text-4xl text-[#1E1424] mb-3">Our Tarot Services</h2>
        <p class="text-[#6B6270] text-sm">Choose the guidance you need, and let the cards show you the way.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <div
          v-for="(service, i) in services"
          :key="service.title"
          :ref="addCardEl"
          class="reveal bg-white border border-[#E8DED0] rounded-2xl p-6 text-center hover:shadow-lg hover:shadow-[#E8DED0]/60 hover:-translate-y-1 transition-all duration-300"
          :style="{ transitionDelay: `${i * 80}ms` }"
        >
          <div class="w-12 h-12 mx-auto mb-4 rounded-full border border-[#D9A65C]/40 flex items-center justify-center text-xl text-[#8C6FB0]">
            {{ service.icon }}
          </div>
          <h3 class="font-serif text-base text-[#1E1424] mb-2">{{ service.title }}</h3>
          <p class="text-xs text-[#6B6270] leading-relaxed mb-4">{{ service.desc }}</p>
          <a href="#contact" class="text-xs text-[#8C6FB0] font-medium hover:text-[#D9A65C] transition-colors duration-200">
            Learn More &rarr;
          </a>
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