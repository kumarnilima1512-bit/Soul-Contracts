<!-- pages/about.vue -->
<script setup lang="ts">
interface Profile {
  name: string
  role: string
  tagline: string
  bio: string
  yearsExperience: number | null
  works: string[]
  image: string
}

interface Certificate {
  title: string
  organization: string
  year: string
  image: string
}

const { data: astrologer, pending: astrologerPending } = await useFetch<Profile>('/api/profile/astrologer')
const { data: admin, pending: adminPending } = await useFetch<Profile>('/api/profile/admin')
const { data: certificates, pending: certsPending } = await useFetch<Certificate[]>('/api/certificates')

// Hero entrance
const heroVisible = ref(false)
onMounted(() => requestAnimationFrame(() => (heroVisible.value = true)))

// Generic scroll-reveal
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

    <!-- Hero: What is Soul Contracts -->
    <section class="relative pt-32 pb-20 px-6 overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-[#3A2748] rounded-full blur-3xl opacity-40"></div>

      <Transition
        appear
        enter-active-class="transition-all duration-700 ease-out"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="heroVisible" class="relative max-w-3xl mx-auto text-center">
          <p class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-5">What is Soul Contracts</p>
          <h1 class="font-serif text-4xl md:text-5xl text-[#F7F1E8] mb-6">
            Where Ancient Wisdom Meets <span class="text-[#D9A65C]">Modern Clarity</span>
          </h1>
          <p class="text-[#C9BFAF] leading-relaxed max-w-xl mx-auto">
            Soul Contracts is a space for tarot, astrology, and intuitive
            guidance — built to help you understand the agreements your soul
            made before this life, and the path it's asking you to walk now.
          </p>
        </div>
      </Transition>
    </section>

    <!-- Astrologer Profile -->
    <section :ref="addRevealEl" class="reveal bg-[#F7F1E8] py-20 px-6">
      <div v-if="astrologerPending" class="text-center text-[#6B6270] text-sm">Loading profile...</div>

      <div v-else-if="astrologer" class="max-w-5xl mx-auto grid md:grid-cols-[auto_1fr] gap-10 items-center">
        <Transition
          appear
          enter-active-class="transition-all duration-700 ease-out"
          enter-from-class="opacity-0 scale-90"
          enter-to-class="opacity-100 scale-100"
        >
          <div class="flex justify-center">
            <div class="relative">
              <div class="w-56 h-72 rounded-t-full overflow-hidden border border-[#D9A65C]/50 shadow-xl">
                <img :src="astrologer.image" :alt="astrologer.name" class="w-full h-full object-cover" />
              </div>
              <div
                v-if="astrologer.yearsExperience"
                class="absolute -bottom-4 -right-4 bg-[#1E1424] border border-[#D9A65C]/50 rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg"
              >
                <p class="font-serif text-xl text-[#D9A65C] leading-none">{{ astrologer.yearsExperience }}+</p>
                <p class="text-[8px] uppercase tracking-wide text-[#C9BFAF] mt-1">Years</p>
              </div>
            </div>
          </div>
        </Transition>

        <div class="text-center md:text-left">
          <p class="uppercase tracking-[0.3em] text-xs text-[#8C6FB0] mb-3">{{ astrologer.tagline }}</p>
          <h2 class="font-serif text-2xl md:text-3xl text-[#1E1424] mb-4">{{ astrologer.name }}</h2>
          <p class="text-sm text-[#6B6270] leading-relaxed whitespace-pre-line mb-6">{{ astrologer.bio }}</p>
          <p class="font-serif italic text-[#D9A65C] text-sm">Your story matters ♡</p>
        </div>
      </div>
    </section>

    <!-- Certificates -->
    <section class="bg-[#1E1424] py-24 px-6">
      <div class="max-w-6xl mx-auto">
        <div :ref="addRevealEl" class="reveal text-center mb-14">
          <p class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-3">Credentials</p>
          <h2 class="font-serif text-3xl md:text-4xl text-[#F7F1E8] mb-2">Certifications & Training</h2>
          <p class="text-sm text-[#C9BFAF]">Hover a card to see the certificate</p>
        </div>

        <div v-if="certsPending" class="text-center text-[#C9BFAF] text-sm">Loading certificates...</div>

        <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(cert, i) in certificates"
            :key="cert.title"
            :ref="addRevealEl"
            class="reveal group [perspective:1200px] h-72"
            :style="{ transitionDelay: `${i * 100}ms` }"
          >
            <div class="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div class="absolute inset-0 [backface-visibility:hidden] bg-[#2A1D33] rounded-2xl border border-[#D9A65C]/30 flex flex-col items-center justify-center text-center p-6">
                <svg class="icon-neon w-10 h-10 text-[#D9A65C] mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M8.5 13L7 22l5-3 5 3-1.5-9" />
                </svg>
                <h3 class="font-serif text-base text-[#F7F1E8] mb-1">{{ cert.title }}</h3>
                <p class="text-xs text-[#C9BFAF]">{{ cert.organization }} &middot; {{ cert.year }}</p>
                <p class="text-[10px] text-[#8C7A9C] mt-4 uppercase tracking-wide">Hover to view</p>
              </div>

              <div class="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden border border-[#D9A65C]/30">
                <img :src="cert.image" :alt="cert.title" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Website Admin -->
    <section :ref="addRevealEl" class="reveal bg-[#F7F1E8] py-20 px-6">
      <div v-if="adminPending" class="text-center text-[#6B6270] text-sm">Loading...</div>

      <div v-else-if="admin" class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <p class="uppercase tracking-[0.3em] text-xs text-[#8C6FB0] mb-3">Behind This Website</p>
          <h2 class="font-serif text-3xl md:text-4xl text-[#1E1424]">About Admin</h2>
        </div>

        <div class="grid md:grid-cols-[auto_1fr] gap-10 items-center">
          <div class="flex justify-center">
            <div class="w-44 h-44 rounded-full overflow-hidden border border-[#8C6FB0]/40 shadow-lg">
              <img :src="admin.image" :alt="admin.name" class="w-full h-full object-cover" />
            </div>
          </div>

          <div class="text-center md:text-left">
            <p class="uppercase tracking-[0.3em] text-xs text-[#8C6FB0] mb-2">{{ admin.tagline }}</p>
            <h3 class="font-serif text-xl text-[#1E1424] mb-3">{{ admin.name }}</h3>
            <p class="text-sm text-[#6B6270] leading-relaxed whitespace-pre-line mb-6">{{ admin.bio }}</p>

            <div v-if="admin.works.length">
              <p class="text-xs uppercase tracking-wide text-[#8C7A9C] mb-2">Other Works</p>
              <ul class="flex flex-wrap gap-2 justify-center md:justify-start">
                <li
                  v-for="work in admin.works"
                  :key="work"
                  class="text-xs bg-[#8C6FB0]/10 text-[#8C6FB0] px-3 py-1.5 rounded-full"
                >
                  {{ work }}
                </li>
              </ul>
            </div>
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
      <NuxtLink to="/contact" class="inline-flex items-center gap-2 bg-[#D9A65C] text-[#1E1424] font-medium px-8 py-3 rounded-full text-sm hover:bg-[#c99648] transition-colors duration-200">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </svg>
        Book a Reading
      </NuxtLink>
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
.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}

.icon-neon {
  filter: drop-shadow(0 0 4px rgba(217, 166, 92, 0.7)) drop-shadow(0 0 10px rgba(217, 166, 92, 0.4));
}
</style>