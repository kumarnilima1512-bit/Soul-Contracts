<!-- pages/contact.vue -->
<script setup lang="ts">
interface ContactInfo {
  label: string
  value: string
  icon: 'mail' | 'phone' | 'location' | 'clock'
}

interface SocialLink {
  label: string
  href: string
  icon: 'instagram' | 'whatsapp' | 'facebook'
}

const contactInfo: ContactInfo[] = [
  { label: 'Email', value: 'hello@soulcontracts.com', icon: 'mail' },
  { label: 'Phone', value: '+91 98765 43210', icon: 'phone' },
  { label: 'Location', value: 'Online / Video Call Sessions', icon: 'location' },
  { label: 'Availability', value: 'Mon – Sat, 10 AM – 7 PM', icon: 'clock' },
]

const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'WhatsApp', href: 'https://wa.me/', icon: 'whatsapp' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
]

const faqs = [
  { q: 'How long does a reading session take?', a: 'Most sessions run between 30 to 60 minutes, depending on the type of reading and how many questions you bring.' },
  { q: 'Do you offer online sessions?', a: 'Yes, all sessions are conducted online via video call, so you can connect from anywhere.' },
  { q: 'How should I prepare for my reading?', a: 'Come with an open mind and any specific questions or areas of your life you would like guidance on.' },
  { q: 'What if I need to reschedule?', a: 'No problem — just reach out at least 24 hours in advance and we will find a new time that works for you.' },
]

const openFaq = ref<number | null>(null)
const toggleFaq = (i: number) => {
  openFaq.value = openFaq.value === i ? null : i
}

const form = reactive({
  name: '',
  email: '',
  service: 'Tarot Reading',
  message: '',
})

const serviceOptions = ['Tarot Reading', 'Numerology', 'Vedic Chart', 'Crystal Healing', 'Energy Healing', 'Not Sure Yet']

const submitted = ref(false)
const errorMsg = ref('')

const submitForm = () => {
  errorMsg.value = ''
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    errorMsg.value = 'Please fill in your name, email, and message.'
    return
  }

  submitted.value = true
  form.name = ''
  form.email = ''
  form.message = ''
  form.service = 'Tarot Reading'

  setTimeout(() => (submitted.value = false), 4000)
}

const heroVisible = ref(false)
onMounted(() => requestAnimationFrame(() => (heroVisible.value = true)))

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

    <section class="relative pt-32 pb-10 px-6 overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-[#3A2748] rounded-full blur-3xl opacity-40"></div>

      <Transition
        appear
        enter-active-class="transition-all duration-700 ease-out"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="heroVisible" class="relative max-w-3xl mx-auto text-center">
          <p class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-4">Let's Connect</p>
          <h1 class="font-serif text-4xl md:text-5xl text-[#F7F1E8] mb-5">
            Ask, Book, or Just <span class="text-[#D9A65C]">Say Hello</span>
          </h1>
          <p class="text-[#C9BFAF] leading-relaxed max-w-xl mx-auto">
            Whether you have a question or you're ready to book your reading,
            reach out — a response usually comes within a day.
          </p>
        </div>
      </Transition>
    </section>

    <section class="px-6 pb-24">
      <div class="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-8">
        <div :ref="addRevealEl" class="reveal flex flex-col gap-5">
          <div
            v-for="info in contactInfo"
            :key="info.label"
            class="bg-[#2A1D33] border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:border-[#D9A65C]/40 transition-colors duration-300"
          >
            <span class="w-11 h-11 shrink-0 flex items-center justify-center rounded-full border border-[#D9A65C]/40 text-[#D9A65C]">
              <svg v-if="info.icon === 'mail'" class="icon-neon w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <svg v-else-if="info.icon === 'phone'" class="icon-neon w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.7a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z" />
              </svg>
              <svg v-else-if="info.icon === 'location'" class="icon-neon w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <svg v-else class="icon-neon w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3.5 2" />
              </svg>
            </span>
            <div>
              <p class="text-[10px] uppercase tracking-wide text-[#8C7A9C]">{{ info.label }}</p>
              <p class="text-sm text-[#F7F1E8]">{{ info.value }}</p>
            </div>
          </div>

          <div class="bg-[#2A1D33] border border-white/10 rounded-2xl p-6">
            <p class="text-[10px] uppercase tracking-wide text-[#8C7A9C] mb-4">Follow Along</p>
            <div class="flex gap-3">
              <a
                v-for="social in socialLinks"
                :key="social.label"
                :href="social.href"
                target="_blank"
                rel="noopener"
                class="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-[#D9A65C] hover:border-[#D9A65C]/50 hover:bg-[#D9A65C]/10 transition-colors duration-200"
              >
                <svg v-if="social.icon === 'instagram'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                <svg v-else-if="social.icon === 'whatsapp'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M21 11.5a8.5 8.5 0 01-12.4 7.6L3 20l1-5.4A8.5 8.5 0 1121 11.5z" />
                </svg>
                <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div :ref="addRevealEl" class="reveal bg-[#2A1D33] border border-white/10 rounded-2xl p-8">
          <h2 class="font-serif text-2xl text-[#F7F1E8] mb-1">Send a Message</h2>
          <p class="text-sm text-[#8C7A9C] mb-6">Fill out the form and we'll get back to you soon.</p>

          <form @submit.prevent="submitForm" class="flex flex-col gap-5">
            <div class="grid sm:grid-cols-2 gap-5">
              <div class="flex flex-col gap-2">
                <label for="c-name" class="text-xs uppercase tracking-wide text-[#8C7A9C]">Name</label>
                <input
                  id="c-name"
                  v-model="form.name"
                  type="text"
                  placeholder="Your name"
                  class="bg-[#1E1424] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#F7F1E8] placeholder:text-[#6B5F78] focus:outline-none focus:border-[#D9A65C]/60 transition-colors duration-200"
                />
              </div>
              <div class="flex flex-col gap-2">
                <label for="c-email" class="text-xs uppercase tracking-wide text-[#8C7A9C]">Email</label>
                <input
                  id="c-email"
                  v-model="form.email"
                  type="email"
                  placeholder="you@example.com"
                  class="bg-[#1E1424] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#F7F1E8] placeholder:text-[#6B5F78] focus:outline-none focus:border-[#D9A65C]/60 transition-colors duration-200"
                />
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label for="c-service" class="text-xs uppercase tracking-wide text-[#8C7A9C]">Interested In</label>
              <select
                id="c-service"
                v-model="form.service"
                class="bg-[#1E1424] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#F7F1E8] focus:outline-none focus:border-[#D9A65C]/60 transition-colors duration-200"
              >
                <option v-for="s in serviceOptions" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>

            <div class="flex flex-col gap-2">
              <label for="c-message" class="text-xs uppercase tracking-wide text-[#8C7A9C]">Message</label>
              <textarea
                id="c-message"
                v-model="form.message"
                rows="5"
                placeholder="Tell us a bit about what you're looking for..."
                class="bg-[#1E1424] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#F7F1E8] placeholder:text-[#6B5F78] focus:outline-none focus:border-[#D9A65C]/60 transition-colors duration-200 resize-none"
              ></textarea>
            </div>

            <p v-if="errorMsg" class="text-xs text-[#D9A5A0]">{{ errorMsg }}</p>
            <p v-if="submitted" class="text-xs text-[#7FBF9F]">Thank you! Your message has been sent.</p>

            <button
              type="submit"
              class="self-start inline-flex items-center gap-2 bg-[#D9A65C] text-[#1E1424] font-medium px-6 py-2.5 rounded-full text-xs hover:bg-[#c99648] transition-colors duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>

    <section :ref="addRevealEl" class="reveal bg-[#F7F1E8] py-20 px-6">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-12">
          <p class="uppercase tracking-[0.3em] text-xs text-[#8C6FB0] mb-3">Good to Know</p>
          <h2 class="font-serif text-3xl md:text-4xl text-[#1E1424]">Frequently Asked</h2>
        </div>

        <div class="flex flex-col gap-3">
          <div
            v-for="(faq, i) in faqs"
            :key="faq.q"
            class="bg-white border border-[#E8DED0] rounded-xl overflow-hidden"
          >
            <button
              @click="toggleFaq(i)"
              class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span class="text-sm text-[#1E1424] font-medium">{{ faq.q }}</span>
              <span
                class="text-[#8C6FB0] text-lg shrink-0 transition-transform duration-300"
                :class="openFaq === i ? 'rotate-45' : ''"
              >+</span>
            </button>
            <div
              class="grid transition-all duration-300 ease-out"
              :style="{ gridTemplateRows: openFaq === i ? '1fr' : '0fr' }"
            >
              <div class="overflow-hidden">
                <p class="text-sm text-[#6B6270] leading-relaxed px-5 pb-4">{{ faq.a }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  filter: drop-shadow(0 0 4px rgba(217, 166, 92, 0.7)) drop-shadow(0 0 10px rgba(217, 166, 92, 0.35));
}
</style>