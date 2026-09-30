<script setup lang="ts">
const facts = [
  { label: 'Years of Experience', value: '3+ Years' },
  { label: 'Specialization', value: 'Tarot Reading & Intuitive Guidance' },
  { label: 'Languages', value: 'English, Hindi, Bengali' },
  { label: 'Session Type', value: 'Online Chat / Voice Call' },
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
  <section id="about" ref="el" class="reveal relative bg-[#1E1424] py-20 px-6 overflow-hidden">
    <div class="relative max-w-6xl mx-auto grid md:grid-cols-[auto_1fr_auto] gap-10 items-center">
      <!-- Photo -->
      <div class="flex justify-center">
        <div class="w-44 h-56 md:w-52 md:h-64 rounded-t-full overflow-hidden border border-[#D9A65C]/40">
          <img src="/images/owner.png" alt="Portrait of the founder" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Text -->
      <div class="text-center md:text-left">
        <p class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-3">About </p>
        <h2 class="font-serif text-2xl md:text-3xl text-[#F7F1E8] mb-4">This is Shreyosi Maitra</h2>
        <p class="text-sm text-[#C9BFAF] leading-relaxed max-w-md mx-auto md:mx-0">
          She is a professional tarot reader with a deep passion for helping
          people find clarity, healing and direction in their lives. Through
          the wisdom of tarot and her intuition, She provides compassionate and
          honest guidance tailored to your unique journey.
        </p>
        <p class="font-serif italic text-[#D9A65C] text-sm mt-5">Your story matters ♡</p>
      </div>

      <!-- Facts -->
      <div class="flex flex-col gap-5">
        <div v-for="(fact, i) in facts" :key="fact.label" class="flex items-center gap-3">
          <span class="w-9 h-9 flex items-center justify-center rounded-full border border-[#D9A65C]/40 text-[#D9A65C]">
            <svg v-if="i === 0" class="icon-neon w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M12 2l2.4 6.8L21 11l-6.6 2.2L12 20l-2.4-6.8L3 11l6.6-2.2L12 2z" />
            </svg>
            <svg v-else-if="i === 1" class="icon-neon w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="3" y="7" width="18" height="6" rx="1" /><rect x="3" y="13" width="18" height="6" rx="1" />
            </svg>
            <svg v-else-if="i === 2" class="icon-neon w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4-4 7-9 7-1 0-2-.1-2.9-.4L4 21l1.5-4C4.5 15.6 4 13.9 4 12c0-4 4-7 9-7s8 3 8 7z" />
            </svg>
            <svg v-else class="icon-neon w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" />
            </svg>
          </span>
          <div>
            <p class="text-[10px] uppercase tracking-wide text-[#8C7A9C]">{{ fact.label }}</p>
            <p class="text-sm text-[#F7F1E8]">{{ fact.value }}</p>
          </div>
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