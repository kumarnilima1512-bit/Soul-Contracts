<!-- pages/services.vue -->
<script setup lang="ts">
interface Service {
  slug: string
  title: string
  tagline: string
  description: string
  icon: string
  price: string
  points: string[]
  image: string
}

const { data: services, pending, error } = await useFetch<Service[]>('/api/services')

// Scroll-reveal
const revealEls = ref<HTMLElement[]>([])

const addRevealEl = (el: any) => {
  if (el && !revealEls.value.includes(el)) {
    revealEls.value.push(el)
  }
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

onMounted(() => {
  requestAnimationFrame(() => {
    heroVisible.value = true
  })
})
</script>

<template>
  <div class="min-h-screen bg-[#1E1424] font-sans overflow-x-hidden">
    <LayoutAppHeader />

    <!-- Hero -->
    <section class="relative pt-32 pb-16 px-6 overflow-hidden">
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-[#3A2748] rounded-full blur-3xl opacity-40"
      ></div>

      <Transition
        appear
        enter-active-class="transition-all duration-700 ease-out"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div
          v-if="heroVisible"
          class="relative max-w-3xl mx-auto text-center"
        >
          <p
            class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-5"
          >
            What We Offer
          </p>

          <h1
            class="font-serif text-4xl md:text-5xl text-[#F7F1E8] mb-6"
          >
            Guidance For Every
            <span class="text-[#D9A65C]">Path</span>
          </h1>

          <p class="text-[#C9BFAF] leading-relaxed max-w-xl mx-auto">
            From tarot and numerology to Vedic astrology and energy healing —
            explore the practices we offer to help you find clarity and
            balance.
          </p>
        </div>
      </Transition>
    </section>

    <!-- Services list -->
    <section class="py-16 px-6">
      <div
        v-if="pending"
        class="text-center text-[#C9BFAF] text-sm"
      >
        Loading services...
      </div>

      <div
        v-else-if="error"
        class="text-center text-[#D9A5A0] text-sm"
      >
        Couldn't load services right now. Please try again later.
      </div>

      <div
        v-else
        class="max-w-6xl mx-auto flex flex-col gap-20"
      >
        <article
          v-for="(service, i) in services"
          :key="service.slug"
          :ref="addRevealEl"
          class="reveal grid md:grid-cols-2 gap-10 items-center"
          :class="
            i % 2 !== 0
              ? 'md:[&>*:first-child]:order-2'
              : ''
          "
        >
          <!-- Image -->
          <div
            class="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl aspect-[4/3] bg-[#2A1D33]"
          >
            <img
              v-if="service.image"
              :src="service.image"
              :alt="service.title"
              class="w-full h-full object-cover"
              loading="lazy"
            />

            <div
              v-else
              class="w-full h-full flex items-center justify-center text-4xl text-[#D9A65C]"
            >
              {{ service.icon }}
            </div>
          </div>

          <!-- Text -->
          <div>
            <p
              class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-3"
            >
              {{ service.tagline }}
            </p>

            <h2
              class="font-serif text-2xl md:text-3xl text-[#F7F1E8] mb-4"
            >
              {{ service.title }}
            </h2>

            <p
              class="text-sm text-[#C9BFAF] leading-relaxed mb-6"
            >
              {{ service.description }}
            </p>

            <ul
              v-if="service.points?.length"
              class="flex flex-col gap-2 mb-8"
            >
              <li
                v-for="point in service.points"
                :key="point"
                class="flex items-center gap-2 text-sm text-[#E7DDD0]"
              >
                <span class="text-[#D9A65C]">✦</span>
                {{ point }}
              </li>
            </ul>

            
            <!-- Learn More -->
            <NuxtLink
            :to="`/services/${service.slug}`"
            class="inline-flex items-center gap-2 bg-[#D9A65C] text-[#1E1424] font-medium px-6 py-2.5 rounded-full text-sm hover:bg-[#c99648] transition-colors duration-200"
            >
            Learn More &rarr;
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <!-- CTA -->
    <section
      :ref="addRevealEl"
      class="reveal bg-[#1E1424] py-20 px-6 text-center border-t border-white/10"
    >
      <h2
        class="font-serif text-3xl md:text-4xl text-[#F7F1E8] mb-4"
      >
        Not Sure Which Reading Is Right For You?
      </h2>

      <p class="text-[#C9BFAF] text-sm mb-8">
        Reach out and we'll help you choose the guidance that fits your
        journey.
      </p>

      <NuxtLink
  to="/contact"
  class="inline-flex items-center gap-2 bg-[#D9A65C] text-[#1E1424] font-medium px-8 py-3 rounded-full text-sm hover:bg-[#c99648] transition-colors duration-200"
>
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
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>