<script setup lang="ts">
type Badge = {
  label: string
  icon: 'star' | 'lock' | 'heart'
}

const badges: Badge[] = [
  { label: 'Personalized\nReadings', icon: 'star' },
  { label: '100% Confidential\n& Safe', icon: 'lock' },
  { label: 'Guidance for\nLove, Career, Health & More', icon: 'heart' },
]

const heroVisible = ref(false)
onMounted(() => {
  requestAnimationFrame(() => (heroVisible.value = true))
})
</script>

<template>
  <section id="home" class="relative min-h-[640px] md:min-h-[680px] overflow-hidden">
    <!-- Full-width background video -->
    
<div class="absolute inset-0">
  <video
    class="w-full h-full object-cover object-[50%_15%] md:object-[65%_20%]"
    autoplay
    muted
    loop
    playsinline
  >
    <source src="/videos/hero.mp4" type="video/mp4" />
  </video>

  <!-- lighter overlay, mostly on the left for text readability only -->
  <div class="absolute inset-0 bg-gradient-to-r from-[#1E1424]/70 via-[#1E1424]/30 to-transparent"></div>
  <div class="absolute inset-0 bg-gradient-to-t from-[#1E1424]/30 via-transparent to-transparent"></div>
</div>

    <!-- Content -->
    <div class="relative max-w-6xl mx-auto px-6 pt-32 pb-16 h-full flex items-center">
      <Transition
        appear
        enter-active-class="transition-all duration-700 ease-out"
        enter-from-class="opacity-0 -translate-x-6"
        enter-to-class="opacity-100 translate-x-0"
      >
        <div v-if="heroVisible" class="max-w-lg">
          <p class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-5">
            Guidance &nbsp;✦&nbsp; Clarity &nbsp;✦&nbsp; Balance
          </p>

          <h1 class="font-serif text-4xl md:text-5xl leading-tight text-[#F7F1E8] mb-6">
            Discover What Your
            <span class="text-[#D9A65C]">Cards</span> Reveal
          </h1>

          <p class="text-[#C9BFAF] mb-10 leading-relaxed">
            Find answers, gain clarity, and align with your true path through
            the ancient wisdom of Tarot. Let's explore what the universe wants you to know.
          </p>

          <a href="#contact" class="inline-flex items-center gap-2 bg-[#D9A65C] text-[#1E1424] font-medium px-7 py-3 rounded-full text-sm hover:bg-[#c99648] transition-colors duration-200 mb-12">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 10h18" />
            </svg>
            Book Your Tarot Reading &rarr;
          </a>

          <div class="flex flex-wrap gap-8 pt-6 border-t border-white/10">
            <div v-for="badge in badges" :key="badge.label" class="flex items-center gap-3">
              <svg
                v-if="badge.icon === 'star'"
                class="icon-neon w-5 h-5 text-[#D9A65C]"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
              >
                <path d="M12 2l2.4 6.8L21 11l-6.6 2.2L12 20l-2.4-6.8L3 11l6.6-2.2L12 2z" />
              </svg>
              <svg
                v-else-if="badge.icon === 'lock'"
                class="icon-neon w-5 h-5 text-[#D9A65C]"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
              >
                <rect x="4" y="10" width="16" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 018 0v3" />
              </svg>
              <svg
                v-else
                class="icon-neon w-5 h-5 text-[#D9A65C]"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
              >
                <path d="M12 21s-7.5-4.7-9.5-9C1 8.5 2.8 5 6.3 5c2 0 3.3 1.1 4.2 2.4C11.4 6.1 12.7 5 14.7 5 18.2 5 20 8.5 18.5 12c-2 4.3-6.5 9-6.5 9z" />
              </svg>
              <span class="text-xs text-[#C9BFAF] whitespace-pre-line leading-snug">{{ badge.label }}</span>
            </div>
          </div>
        </div>
      </Transition>

      
    </div>
  </section>
</template>

<style scoped>
.icon-neon {
  filter: drop-shadow(0 0 4px rgba(217, 166, 92, 0.7)) drop-shadow(0 0 10px rgba(217, 166, 92, 0.35));
}
</style>