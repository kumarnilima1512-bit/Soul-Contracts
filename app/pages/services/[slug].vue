<!-- pages/services/[slug].vue -->
<script setup lang="ts">
interface ServiceDetail {
  slug: string
  title: string
  tagline: string
  icon: string
  price: string
  description: string
  points: string[]
  image: string
  content: string[]
}

const route = useRoute()
const slug = route.params.slug as string

const { data: service, pending, error } = await useFetch<ServiceDetail>(`/api/services/${slug}`)
</script>

<template>
  <div class="min-h-screen bg-[#1E1424] font-sans overflow-x-hidden">
    <LayoutAppHeader />

    <section class="pt-32 pb-20 px-6">
      <div v-if="pending" class="max-w-3xl mx-auto text-center text-[#C9BFAF] text-sm">
        Loading reading details...
      </div>

      <div v-else-if="error || !service" class="max-w-3xl mx-auto text-center">
        <p class="text-[#D9A5A0] text-sm mb-4">We couldn't find this reading.</p>
        <NuxtLink to="/services" class="text-[#D9A65C] text-sm hover:underline">&larr; Back to all services</NuxtLink>
      </div>

      <div v-else class="max-w-4xl mx-auto">
        <NuxtLink to="/services" class="text-xs text-[#8C7A9C] hover:text-[#D9A65C] transition-colors duration-200">
          &larr; Back to all readings
        </NuxtLink>

        <div class="grid md:grid-cols-[auto_1fr] gap-6 items-center mt-6 mb-8">
          <div class="w-16 h-16 rounded-full border border-[#D9A65C]/40 flex items-center justify-center text-2xl text-[#D9A65C]">
            {{ service.icon }}
          </div>
          <div>
            <p class="uppercase tracking-[0.3em] text-xs text-[#D9A65C] mb-2">{{ service.tagline }}</p>
            <h1 class="font-serif text-3xl md:text-4xl text-[#F7F1E8]">{{ service.title }}</h1>
          </div>
        </div>

        <div v-if="service.image" class="rounded-2xl overflow-hidden border border-white/10 mb-10 aspect-[16/9]">
          <img :src="service.image" :alt="service.title" class="w-full h-full object-cover" />
        </div>

        <div class="grid md:grid-cols-[1fr_auto] gap-8 items-start">
          <div>
            <h2 class="font-serif text-xl text-[#F7F1E8] mb-3">About This Reading</h2>
            <p class="text-sm text-[#C9BFAF] leading-relaxed mb-8">{{ service.description }}</p>

            <template v-if="service.points.length">
              <h2 class="font-serif text-xl text-[#F7F1E8] mb-3">What's Included</h2>
              <ul class="flex flex-col gap-2 mb-8">
                <li v-for="point in service.points" :key="point" class="flex items-center gap-2 text-sm text-[#E7DDD0]">
                  <span class="text-[#D9A65C]">✦</span>{{ point }}
                </li>
              </ul>
            </template>

            <!-- Free-form content written inside the Notion page itself -->
            <template v-if="service.content?.length">
              <h2 class="font-serif text-xl text-[#F7F1E8] mb-3">More Details</h2>
              <div class="flex flex-col gap-3">
                <p v-for="(line, i) in service.content" :key="i" class="text-sm text-[#C9BFAF] leading-relaxed">
                  {{ line }}
                </p>
              </div>
            </template>
          </div>

          <div class="bg-[#2A1D33] border border-white/10 rounded-2xl p-6 w-full md:w-64">
            <p class="text-[10px] uppercase tracking-wide text-[#8C7A9C] mb-1">Price</p>
            <p class="font-serif text-2xl text-[#D9A65C] mb-6">{{ service.price }}</p>

            <NuxtLink
              to="/contact"
              class="block text-center bg-[#D9A65C] text-[#1E1424] font-medium px-5 py-2.5 rounded-full text-xs hover:bg-[#c99648] transition-colors duration-200"
            >
              Book This Reading
            </NuxtLink>
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
</style>