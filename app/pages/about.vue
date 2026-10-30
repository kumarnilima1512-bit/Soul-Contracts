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

// Certificates temporarily disabled
// interface Certificate {
//   title: string
//   organization: string
//   year: string
//   image: string
// }

const { data: astrologer, pending: astrologerPending } = await useFetch<Profile>('/api/profile/astrologer')
const { data: admin, pending: adminPending } = await useFetch<Profile>('/api/profile/admin')
// const { data: certificates, pending: certsPending } = await useFetch<Certificate[]>('/api/certificates')

const pillars = [
  {
    title: 'Tarot',
    text: 'A mirror for what you already feel but cannot yet name. Each spread brings hidden patterns, choices and turning points into the light.'
  },
  {
    title: 'Astrology',
    text: 'Your birth chart is a map of the energies you arrived with, showing your gifts, your lessons and the timing of the seasons in your life.'
  },
  {
    title: 'Intuitive Guidance',
    text: 'Gentle, honest conversation that connects the symbols with your real life, so insight turns into steps you can actually take.'
  }
]

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
    <section class="relative pt-32 pb-12 px-6 overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-[#3A2748] rounded-full blur-3xl opacity-40"></div>

      <Transition
        appear
        enter-active-class="transition-all duration-700 ease-out"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="heroVisible" class="relative max-w-3xl mx-auto text-center">
          <p class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-5">What is Soul Contracts</p>
          <h1 class="font-serif text-4xl md:text-5xl text-[#F7F1E8] mb-8">
            Where Ancient Wisdom Meets <span class="text-[#D9A65C]">Modern Clarity</span>
          </h1>

          <div class="space-y-5 text-[#C9BFAF] leading-relaxed max-w-2xl mx-auto">
            <p>
              Soul Contracts is a space for tarot, astrology, and intuitive
              guidance, built to help you understand the agreements your soul
              made before this life, and the path it is asking you to walk now.
            </p>
            <p>
              Many of us sense that certain people, patterns and lessons keep
              returning to us for a reason. We call these <span class="text-[#D9A65C]">soul contracts</span>:
              the relationships, challenges and callings we agreed to meet in
              order to grow. Some feel like gifts, others like heavy
              repetition, but each one carries a purpose.
            </p>
            <p>
              Here, ancient tools like the tarot and the birth chart are used
              not to predict a fixed fate, but to bring clarity. They help you
              see what is truly happening beneath the surface, release what no
              longer serves you, and make choices that feel aligned with who
              you really are.
            </p>
            <p class="font-serif italic text-[#F7F1E8]">
              You are not here by accident, and you are not walking this path
              alone.
            </p>
          </div>
        </div>
      </Transition>
    </section>

    <!-- Pillars: how Soul Contracts works -->
    <section :ref="addRevealEl" class="reveal relative pb-20 px-6">
      <div class="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        <div
          v-for="pillar in pillars"
          :key="pillar.title"
          class="bg-[#2A1D33] border border-[#D9A65C]/30 rounded-2xl p-6 text-center"
        >
          <h3 class="font-serif text-lg text-[#D9A65C] mb-3">{{ pillar.title }}</h3>
          <p class="text-sm text-[#C9BFAF] leading-relaxed">{{ pillar.text }}</p>
        </div>
      </div>
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

    <!--
      Certificates section
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
    -->

    <!-- Website Admin -->
    <section :ref="addRevealEl" class="reveal bg-[#1E1424] py-20 px-6">
      <div v-if="adminPending" class="text-center text-[#C9BFAF] text-sm">Loading...</div>

      <div v-else-if="admin" class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <p class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-3">Behind This Website</p>
          <h2 class="font-serif text-3xl md:text-4xl text-[#F7F1E8]">About Admin</h2>
        </div>

        <div class="grid md:grid-cols-[auto_1fr] gap-10 items-center">
          <div class="flex flex-col items-center gap-6">
            <div class="relative">
              <div class="w-44 h-44 rounded-full overflow-hidden border border-[#D9A65C]/40 shadow-lg">
                <img :src="admin.image" :alt="admin.name" class="w-full h-full object-cover" />
              </div>
              <div
                v-if="admin.yearsExperience"
                class="absolute -bottom-3 -right-3 bg-[#2A1D33] border border-[#D9A65C]/50 rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg"
              >
                <p class="font-serif text-xl text-[#D9A65C] leading-none">{{ admin.yearsExperience }}+</p>
                <p class="text-[8px] uppercase tracking-wide text-[#C9BFAF] mt-1">Years</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <a
                href="https://nilima-kumar.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Portfolio"
                title="Portfolio"
                class="w-10 h-10 rounded-full border border-[#D9A65C]/40 text-[#D9A65C] flex items-center justify-center hover:bg-[#D9A65C] hover:text-[#1E1424] transition-colors duration-200"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
                  <path d="M3 13h18" />
                </svg>
              </a>

              <a
                href="https://github.com/kumarnilima1512-bit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                class="w-10 h-10 rounded-full border border-[#D9A65C]/40 text-[#D9A65C] flex items-center justify-center hover:bg-[#D9A65C] hover:text-[#1E1424] transition-colors duration-200"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/nilimakumar?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                class="w-10 h-10 rounded-full border border-[#D9A65C]/40 text-[#D9A65C] flex items-center justify-center hover:bg-[#D9A65C] hover:text-[#1E1424] transition-colors duration-200"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <div class="text-center md:text-left">
            <p class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-2">{{ admin.tagline }}</p>
            <h3 class="font-serif text-xl text-[#F7F1E8] mb-3">{{ admin.name }}</h3>
            <p class="text-sm text-[#C9BFAF] leading-relaxed whitespace-pre-line mb-6">{{ admin.bio }}</p>

            <div v-if="admin.works.length">
              <p class="text-xs uppercase tracking-wide text-[#8C7A9C] mb-2">Other Works</p>
              <ul class="flex flex-wrap gap-2 justify-center md:justify-start">
                <li
                  v-for="work in admin.works"
                  :key="work"
                  class="text-xs bg-[#D9A65C]/10 text-[#D9A65C] px-3 py-1.5 rounded-full"
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
    <section :ref="addRevealEl" class="reveal bg-[#F7F1E8] py-20 px-6 text-center">
      <h2 class="font-serif text-3xl md:text-4xl text-[#1E1424] mb-4">
        Ready to See What the Cards Reveal?
      </h2>
      <p class="text-[#6B6270] text-sm mb-8">
        Book a one-on-one tarot session and get personalized insight into your journey.
      </p>
      <NuxtLink to="/contact" class="inline-flex items-center gap-2 bg-[#1E1424] text-[#D9A65C] font-medium px-8 py-3 rounded-full text-sm hover:bg-[#2A1D33] transition-colors duration-200">
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