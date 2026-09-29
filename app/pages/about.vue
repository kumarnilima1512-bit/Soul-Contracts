<!-- pages/about.vue -->
<script setup lang="ts">
const milestones = [
  { year: '2016', title: 'Began Tarot Practice', desc: 'Started reading tarot for friends and family, discovering a natural intuitive gift.' },
  { year: '2018', title: 'Certified Tarot Practitioner', desc: 'Completed formal training and certification in traditional tarot systems.' },
  { year: '2020', title: 'Went Professional', desc: 'Opened doors to public readings, reaching over 500 clients in the first year.' },
  { year: '2023', title: '2,500+ Readings Milestone', desc: 'Crossed thousands of sessions across love, career, and life guidance.' },
  { year: '2025', title: 'Soul Contracts Founded', desc: 'Launched this space to offer deeper, personalized tarot guidance online.' },
]

const certificates = [
  { title: 'Certified Tarot Practitioner', org: 'Tarot Association International', year: '2018', image: '/images/cert-1.jpg' },
  { title: 'Advanced Intuitive Reading', org: 'Mystic Arts Academy', year: '2020', image: '/images/cert-2.jpg' },
  { title: 'Astrology & Tarot Integration', org: 'Institute of Esoteric Studies', year: '2022', image: '/images/cert-3.jpg' },
]

const galleryImages = [
  '/images/gallery-1.jpg',
  '/images/gallery-2.jpg',
  '/images/gallery-3.jpg',
  '/images/gallery-4.jpg',
]

// Hero entrance
const heroVisible = ref(false)
onMounted(() => requestAnimationFrame(() => (heroVisible.value = true)))

// Generic scroll-reveal for all sections/items
const revealEls = ref<HTMLElement[]>([])
const addRevealEl = (el: any) => {
  if (el && !revealEls.value.includes(el)) revealEls.value.push(el)
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
  revealEls.value.forEach((el) => observer.observe(el))
})
</script>

<template>
  <div class="min-h-screen bg-[#1E1424] font-sans overflow-x-hidden">
    <LayoutAppHeader />

    <!-- Hero -->
    <section class="relative pt-32 pb-20 px-6 overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-[#3A2748] rounded-full blur-3xl opacity-40"></div>

      <Transition
        appear
        enter-active-class="transition-all duration-700 ease-out"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="heroVisible" class="relative max-w-3xl mx-auto text-center">
          <p class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-5">The Story Behind The Cards</p>
          <h1 class="font-serif text-4xl md:text-5xl text-[#F7F1E8] mb-6">
            Meet Your <span class="text-[#D9A65C]">Guide</span>
          </h1>
          <p class="text-[#C9BFAF] leading-relaxed max-w-xl mx-auto">
            A journey of intuition, study, and thousands of readings —
            dedicated to helping you find clarity in the cards.
          </p>
        </div>
      </Transition>
    </section>

    <!-- Story -->
    <section :ref="addRevealEl" class="reveal bg-[#F7F1E8] py-20 px-6">
      <div class="max-w-5xl mx-auto grid md:grid-cols-[auto_1fr] gap-10 items-center">
        <div class="flex justify-center">
          <div class="w-56 h-72 rounded-t-full overflow-hidden border border-[#D9A65C]/50 shadow-xl">
            <img src="/images/owner.png" alt="Portrait" class="w-full h-full object-cover" />
          </div>
        </div>

        <div class="text-center md:text-left">
          <p class="uppercase tracking-[0.3em] text-xs text-[#8C6FB0] mb-3">My Journey</p>
          <h2 class="font-serif text-2xl md:text-3xl text-[#1E1424] mb-4">
            From Curiosity to Calling
          </h2>
          <p class="text-sm text-[#6B6270] leading-relaxed mb-4">
            My journey with tarot began over a decade ago, born from a deep
            curiosity about the unseen threads connecting our choices, emotions,
            and paths. What started as personal exploration soon became a calling
            to help others find the same clarity I once sought.
          </p>
          <p class="text-sm text-[#6B6270] leading-relaxed">
            Since then, I've had the privilege of guiding thousands of clients
            through love, career, and life's biggest questions — blending
            traditional tarot wisdom with genuine, honest intuition.
          </p>
          <p class="font-serif italic text-[#D9A65C] text-sm mt-6">Your story matters ♡</p>
        </div>
      </div>
    </section>

    <!-- Experience Timeline -->
    <section class="bg-[#1E1424] py-24 px-6">
      <div class="max-w-3xl mx-auto">
        <div :ref="addRevealEl" class="reveal text-center mb-16">
          <p class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-3">Experience</p>
          <h2 class="font-serif text-3xl md:text-4xl text-[#F7F1E8]">The Path So Far</h2>
        </div>

        <div class="relative pl-8">
          <div class="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-[#D9A65C]/60 via-[#D9A65C]/20 to-transparent"></div>

          <div
            v-for="(m, i) in milestones"
            :key="m.year"
            :ref="addRevealEl"
            class="reveal-left relative mb-12 last:mb-0"
            :style="{ transitionDelay: `${i * 100}ms` }"
          >
            <span class="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full bg-[#D9A65C] icon-neon"></span>

            <p class="text-[#D9A65C] text-sm font-medium mb-1">{{ m.year }}</p>
            <h3 class="font-serif text-lg text-[#F7F1E8] mb-1.5">{{ m.title }}</h3>
            <p class="text-sm text-[#C9BFAF] leading-relaxed max-w-md">{{ m.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Certificates -->
    <section class="bg-[#F7F1E8] py-24 px-6">
      <div class="max-w-6xl mx-auto">
        <div :ref="addRevealEl" class="reveal text-center mb-14">
          <p class="uppercase tracking-[0.3em] text-xs text-[#8C6FB0] mb-3">Credentials</p>
          <h2 class="font-serif text-3xl md:text-4xl text-[#1E1424] mb-2">Certifications & Training</h2>
          <p class="text-sm text-[#6B6270]">Hover a card to see the certificate</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(cert, i) in certificates"
            :key="cert.title"
            :ref="addRevealEl"
            class="reveal group [perspective:1200px] h-72"
            :style="{ transitionDelay: `${i * 100}ms` }"
          >
            <div class="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <!-- front -->
              <div class="absolute inset-0 [backface-visibility:hidden] bg-[#1E1424] rounded-2xl border border-[#D9A65C]/30 flex flex-col items-center justify-center text-center p-6">
                <svg class="icon-neon w-10 h-10 text-[#D9A65C] mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M8.5 13L7 22l5-3 5 3-1.5-9" />
                </svg>
                <h3 class="font-serif text-base text-[#F7F1E8] mb-1">{{ cert.title }}</h3>
                <p class="text-xs text-[#C9BFAF]">{{ cert.org }} &middot; {{ cert.year }}</p>
                <p class="text-[10px] text-[#8C7A9C] mt-4 uppercase tracking-wide">Hover to view</p>
              </div>

              <!-- back -->
              <div class="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden border border-[#D9A65C]/30">
                <img :src="cert.image" :alt="cert.title" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section :ref="addRevealEl" class="reveal bg-[#1E1424] py-24 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <p class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-3">Behind the Cards</p>
          <h2 class="font-serif text-3xl md:text-4xl text-[#F7F1E8]">A Glimpse Into My Space</h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="(img, i) in galleryImages"
            :key="i"
            class="rounded-xl overflow-hidden border border-white/10 aspect-[3/4] hover:scale-[1.03] transition-transform duration-300"
          >
            <img :src="img" alt="Studio glimpse" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section :ref="addRevealEl" class="reveal bg-[#1E1424] py-20 px-6 text-center border-t border-white/10">
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

    <LayoutAppFooter />
  </div>
</template>

<style scoped>
.font-serif {
  font-family: 'Playfair Display', 'Georgia', serif;
}

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.reveal-left {
  opacity: 0;
  transform: translateX(-16px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.reveal-visible {
  opacity: 1;
  transform: translateY(0) translateX(0);
}

.icon-neon {
  filter: drop-shadow(0 0 4px rgba(217, 166, 92, 0.7)) drop-shadow(0 0 10px rgba(217, 166, 92, 0.4));
}
</style>