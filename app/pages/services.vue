<!-- pages/services.vue -->
<script setup lang="ts">
// This array structure mirrors what a Notion/CMS fetch would return.
// Each service has an `image` field — swap the static data below with
// a fetch call (e.g. useAsyncData('services', () => $fetch('/api/services')))
// once the Notion integration is ready, keeping the same shape.
interface Service {
  slug: string
  title: string
  tagline: string
  description: string
  image: string // will come from Notion/database later
  points: string[]
}

const services = ref<Service[]>([
  {
    slug: 'numerology',
    title: 'Numerology',
    tagline: 'Decode the numbers that shape your life',
    description:
      'Your birth date and name carry vibrational numbers that reveal your personality, life path, and hidden strengths. A numerology reading maps out these numbers to give you a clearer sense of purpose and timing.',
    image: '/images/services/numerology.jpg',
    points: ['Life Path Number', 'Destiny & Soul Urge', 'Favorable Timing'],
  },
  {
    slug: 'tarot',
    title: 'Tarot Reading',
    tagline: 'Let the cards speak to your present and future',
    description:
      'A tarot reading uses ancient symbolism to reflect your current energy and possible paths ahead. Whether it is love, career, or a pressing decision, the cards offer clarity grounded in intuition.',
    image: '/images/services/tarot.jpg',
    points: ['Love & Relationships', 'Career & Finance', 'Yes / No Guidance'],
  },
  {
    slug: 'vedic-chart',
    title: 'Vedic Chart Reading',
    tagline: 'Ancient astrology, precise and personal',
    description:
      "Rooted in Jyotish tradition, a Vedic birth chart reading examines planetary placements at your exact time of birth to reveal your strengths, challenges, and the karmic patterns shaping your journey.",
    image: '/images/services/vedic-chart.jpg',
    points: ['Birth Chart Analysis', 'Dasha & Timing', 'Remedial Guidance'],
  },
  {
    slug: 'crystal-healing',
    title: 'Crystal Healing',
    tagline: 'Restore balance through natural energy',
    description:
      'Crystal healing works with the subtle energy fields of the body, using specific stones to help release blockages, ease stress, and restore emotional and physical balance.',
    image: '/images/services/crystal.jpg',
    points: ['Chakra Balancing', 'Stress & Anxiety Relief', 'Personalized Crystal Kit'],
  },
  {
    slug: 'energy-healing',
    title: 'Energy Healing',
    tagline: 'Gentle guidance for deeper wellbeing',
    description:
      'A holistic healing session that works with your energy field to release stagnant emotions, calm the mind, and support overall wellbeing — complementing tarot and astrological insight.',
    image: '/images/services/healing.jpg',
    points: ['Emotional Release', 'Mind-Body Balance', 'Guided Sessions'],
  },
])

// Scroll-reveal
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

const heroVisible = ref(false)
onMounted(() => requestAnimationFrame(() => (heroVisible.value = true)))
</script>

<template>
  <div class="min-h-screen bg-[#1E1424] font-sans overflow-x-hidden">
    <LayoutAppHeader />

    <!-- Hero -->
    <section class="relative pt-32 pb-16 px-6 overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-[#3A2748] rounded-full blur-3xl opacity-40"></div>

      <Transition
        appear
        enter-active-class="transition-all duration-700 ease-out"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="heroVisible" class="relative max-w-3xl mx-auto text-center">
          <p class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-5">What We Offer</p>
          <h1 class="font-serif text-4xl md:text-5xl text-[#F7F1E8] mb-6">
            Guidance For Every <span class="text-[#D9A65C]">Path</span>
          </h1>
          <p class="text-[#C9BFAF] leading-relaxed max-w-xl mx-auto">
            From tarot and numerology to Vedic astrology and energy healing —
            explore the practices we offer to help you find clarity and balance.
          </p>
        </div>
      </Transition>
    </section>

    <!-- Services list -->
    <section class="py-16 px-6">
      <div class="max-w-6xl mx-auto flex flex-col gap-20">
        <article
          v-for="(service, i) in services"
          :key="service.slug"
          :ref="addRevealEl"
          class="reveal grid md:grid-cols-2 gap-10 items-center"
          :class="i % 2 !== 0 ? 'md:[&>*:first-child]:order-2' : ''"
        >
          <!-- Image slot (from database/Notion) -->
          <div class="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl aspect-[4/3] bg-[#2A1D33]">
            <img
              :src="service.image"
              :alt="service.title"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <!-- Text -->
          <div>
            <p class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-3">{{ service.tagline }}</p>
            <h2 class="font-serif text-2xl md:text-3xl text-[#F7F1E8] mb-4">{{ service.title }}</h2>
            <p class="text-sm text-[#C9BFAF] leading-relaxed mb-6">{{ service.description }}</p>

            <ul class="flex flex-col gap-2 mb-8">
              <li v-for="point in service.points" :key="point" class="flex items-center gap-2 text-sm text-[#E7DDD0]">
                <span class="text-[#D9A65C]">✦</span>{{ point }}
              </li>
            </ul>

            <NuxtLink
              :to="`/#contact`"
              class="inline-flex items-center gap-2 bg-[#D9A65C] text-[#1E1424] font-medium px-6 py-2.5 rounded-full text-sm hover:bg-[#c99648] transition-colors duration-200"
            >
              Book This Reading &rarr;
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <!-- CTA -->
    <section :ref="addRevealEl" class="reveal bg-[#1E1424] py-20 px-6 text-center border-t border-white/10">
      <h2 class="font-serif text-3xl md:text-4xl text-[#F7F1E8] mb-4">
        Not Sure Which Reading Is Right For You?
      </h2>
      <p class="text-[#C9BFAF] text-sm mb-8">
        Reach out and we'll help you choose the guidance that fits your journey.
      </p>
      <NuxtLink to="/#contact" class="inline-flex items-center gap-2 bg-[#D9A65C] text-[#1E1424] font-medium px-8 py-3 rounded-full text-sm hover:bg-[#c99648] transition-colors duration-200">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </svg>
        Contact Us
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
</style>