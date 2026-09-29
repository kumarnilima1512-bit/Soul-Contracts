<!-- pages/testimonials.vue -->
<script setup lang="ts">
interface Testimonial {
  name: string
  category: 'Love' | 'Career' | 'Life Guidance' | 'Tarot'
  quote: string
  rating: number
}

const testimonials = ref<Testimonial[]>([
  { name: 'Priya S.', category: 'Career', quote: "Aarohi's reading gave me so much clarity about my career path. I feel more confident and at peace now. Highly recommended!", rating: 5 },
  { name: 'Rohan D.', category: 'Life Guidance', quote: "Her insights are so accurate and comforting. I've always found the guidance I needed. Truly a blessing!", rating: 5 },
  { name: 'Ananya M.', category: 'Love', quote: 'The reading was deeply personal and helped me see things from a completely new perspective. Thank you so much for your honesty and warmth.', rating: 5 },
  { name: 'Kabir R.', category: 'Tarot', quote: 'I was skeptical at first, but the session completely changed my mind. Every card felt like it understood exactly where I was in life.', rating: 5 },
  { name: 'Ishita N.', category: 'Love', quote: 'Gave me the courage to make a decision I had been avoiding for months. Forever grateful.', rating: 5 },
  { name: 'Arjun T.', category: 'Career', quote: 'The career reading was spot on — within weeks the exact opportunity she mentioned came up, and I took it with confidence.', rating: 5 },
  { name: 'Meera K.', category: 'Life Guidance', quote: 'Calm, honest, and incredibly insightful. It felt like talking to someone who genuinely wanted the best for me.', rating: 5 },
  { name: 'Devansh P.', category: 'Tarot', quote: 'Best tarot session I have ever had. Clear, direct, and surprisingly comforting.', rating: 5 },
])

const categories = ['All', 'Love', 'Career', 'Life Guidance', 'Tarot'] as const
const formCategories = ['Love', 'Career', 'Life Guidance', 'Tarot'] as const
const activeCategory = ref<typeof categories[number]>('All')

const filteredTestimonials = computed(() => {
  if (activeCategory.value === 'All') return testimonials.value
  return testimonials.value.filter((t) => t.category === activeCategory.value)
})

const stats = [
  { number: '3,000+', label: 'Sessions Held' },
  { number: '4.9★', label: 'Average Rating' },
  { number: '98%', label: 'Would Recommend' },
]

// --- Review form state ---
const form = reactive({
  name: '',
  category: 'Tarot' as typeof formCategories[number],
  rating: 5,
  quote: '',
})

const submitted = ref(false)
const errorMsg = ref('')

const submitReview = () => {
  errorMsg.value = ''

  if (!form.name.trim() || !form.quote.trim()) {
    errorMsg.value = 'Please fill in your name and review before submitting.'
    return
  }

  // NOTE: this only updates local state for now.
  // Once a backend/Notion database is connected, replace this
  // with an API call, e.g.:
  // await $fetch('/api/testimonials', { method: 'POST', body: { ...form } })
  testimonials.value.unshift({
    name: form.name.trim(),
    category: form.category,
    quote: form.quote.trim(),
    rating: form.rating,
  })

  form.name = ''
  form.quote = ''
  form.rating = 5
  form.category = 'Tarot'

  submitted.value = true
  setTimeout(() => (submitted.value = false), 3000)
}

// Hero entrance
const heroVisible = ref(false)
onMounted(() => requestAnimationFrame(() => (heroVisible.value = true)))

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
    { threshold: 0.1 }
  )
  revealEls.value.forEach((el) => observer.observe(el))
})
</script>

<template>
  <div class="min-h-screen bg-[#1E1424] font-sans overflow-x-hidden">
    <LayoutAppHeader />

    <!-- Hero -->
    <section class="relative pt-32 pb-14 px-6 overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-[#3A2748] rounded-full blur-3xl opacity-40"></div>

      <Transition
        appear
        enter-active-class="transition-all duration-700 ease-out"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="heroVisible" class="relative max-w-3xl mx-auto text-center">
          <p class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-4">Real Stories, Real Guidance</p>
          <h1 class="font-serif text-4xl md:text-5xl text-[#F7F1E8] mb-5">
            Words From The <span class="text-[#D9A65C]">Journey</span>
          </h1>
          <p class="text-[#C9BFAF] leading-relaxed max-w-xl mx-auto">
            Every reading is a story. Here's what clients have shared about
            their experience and the clarity they found along the way.
          </p>
        </div>
      </Transition>

      <div :ref="addRevealEl" class="reveal relative flex flex-wrap justify-center gap-10 mt-12 mb-4">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <p class="font-serif text-2xl md:text-3xl text-[#D9A65C]">{{ stat.number }}</p>
          <p class="text-xs text-[#8C7A9C] uppercase tracking-wide mt-1">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Filter tags -->
    <section class="px-6 pt-6 pb-8">
      <div class="max-w-6xl mx-auto flex flex-wrap justify-center gap-3">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          class="px-5 py-2 rounded-full text-xs border transition-colors duration-200"
          :class="activeCategory === cat
            ? 'bg-[#D9A65C] text-[#1E1424] border-[#D9A65C]'
            : 'border-white/15 text-[#C9BFAF] hover:border-[#D9A65C]/50 hover:text-[#D9A65C]'"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- Horizontal scroll wall -->
    <section class="pb-20">
      <div class="max-w-6xl mx-auto px-6 mb-6">
        <p class="text-xs text-[#8C7A9C] text-center">Swipe or scroll to see more &rarr;</p>
      </div>

      <div class="overflow-x-auto scrollbar-hide px-6">
        <TransitionGroup
          tag="div"
          name="fade-list"
          class="flex gap-5 w-max pb-4"
        >
          <div
            v-for="t in filteredTestimonials"
            :key="t.name + t.quote.slice(0, 10)"
            class="bg-[#2A1D33] border border-white/10 rounded-2xl p-6 flex flex-col justify-between w-72 md:w-80 shrink-0"
          >
            <div>
              <p class="text-[#D9A65C] text-sm mb-3">
                <span v-for="n in t.rating" :key="n">★</span>
              </p>
              <p class="text-sm text-[#E7DDD0] leading-relaxed">"{{ t.quote }}"</p>
            </div>

            <div class="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
              <p class="text-sm text-[#F7F1E8] font-medium">{{ t.name }}</p>
              <span class="text-[10px] uppercase tracking-wide text-[#8C6FB0] bg-[#8C6FB0]/10 px-2.5 py-1 rounded-full">
                {{ t.category }}
              </span>
            </div>
          </div>
        </TransitionGroup>

        <p v-if="filteredTestimonials.length === 0" class="text-center text-[#8C7A9C] text-sm py-16 w-full">
          No testimonials in this category yet.
        </p>
      </div>
    </section>

    <!-- Leave a Review -->
    <section :ref="addRevealEl" class="reveal bg-[#2A1D33] py-20 px-6">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-10">
          <p class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-3">Share Your Experience</p>
          <h2 class="font-serif text-3xl md:text-4xl text-[#F7F1E8] mb-3">Leave a Review</h2>
          <p class="text-sm text-[#C9BFAF]">Had a session with us? We'd love to hear about it.</p>
        </div>

        <form @submit.prevent="submitReview" class="flex flex-col gap-5">
          <div class="grid sm:grid-cols-2 gap-5">
            <div class="flex flex-col gap-2">
              <label for="name" class="text-xs uppercase tracking-wide text-[#8C7A9C]">Your Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="e.g. Priya S."
                class="bg-[#1E1424] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#F7F1E8] placeholder:text-[#6B5F78] focus:outline-none focus:border-[#D9A65C]/60 transition-colors duration-200"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="category" class="text-xs uppercase tracking-wide text-[#8C7A9C]">Reading Type</label>
              <select
                id="category"
                v-model="form.category"
                class="bg-[#1E1424] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#F7F1E8] focus:outline-none focus:border-[#D9A65C]/60 transition-colors duration-200"
              >
                <option v-for="cat in formCategories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-xs uppercase tracking-wide text-[#8C7A9C]">Rating</label>
            <div class="flex gap-1.5">
              <button
                v-for="n in 5"
                :key="n"
                type="button"
                @click="form.rating = n"
                class="text-2xl transition-colors duration-150"
                :class="n <= form.rating ? 'text-[#D9A65C]' : 'text-white/15'"
              >
                ★
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label for="quote" class="text-xs uppercase tracking-wide text-[#8C7A9C]">Your Review</label>
            <textarea
              id="quote"
              v-model="form.quote"
              rows="4"
              placeholder="Tell us about your experience..."
              class="bg-[#1E1424] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#F7F1E8] placeholder:text-[#6B5F78] focus:outline-none focus:border-[#D9A65C]/60 transition-colors duration-200 resize-none"
            ></textarea>
          </div>

          <p v-if="errorMsg" class="text-xs text-[#D9A5A0] text-center">{{ errorMsg }}</p>
          <p v-if="submitted" class="text-xs text-[#7FBF9F] text-center">Thank you! Your review has been added.</p>

          <button
            type="submit"
            class="mx-auto block bg-[#D9A65C] text-[#1E1424] font-medium px-6 py-2.5 rounded-full text-xs hover:bg-[#c99648] transition-colors duration-200"
          >
            Submit Review
          </button>
        </form>
      </div>
    </section>

    <!-- CTA -->
    <section :ref="addRevealEl" class="reveal bg-[#F7F1E8] py-20 px-6 text-center">
      <h2 class="font-serif text-3xl md:text-4xl text-[#1E1424] mb-4">
        Ready to Write Your Own Story?
      </h2>
      <p class="text-[#6B6270] text-sm mb-8">
        Book a session and see what clarity feels like.
      </p>
      <NuxtLink to="/#contact" class="inline-flex items-center gap-2 bg-[#8C6FB0] text-white font-medium px-8 py-3 rounded-full text-sm hover:bg-[#7a5b9c] transition-colors duration-200">
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

.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.3s ease;
}
.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.fade-list-move {
  transition: transform 0.3s ease;
}

.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>