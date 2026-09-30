
<script setup lang="ts">
const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
]

const isMenuOpen = ref(false)
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-[#1E1424]/90 backdrop-blur-md border-b border-white/10">
    <nav class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3">
        <img
          src="/images/logo/logo.png"
          alt="Soul Contracts"
          class="w-18 h-20 object-contain"
        />

        <span class="font-serif text-xl text-[#F7F1E8] leading-tight">
          Soul Contracts
        </span>
      </NuxtLink>

      <ul class="hidden md:flex items-center gap-9 text-sm text-[#E7DDD0]">
        <li v-for="link in navLinks" :key="link.label">
          <NuxtLink
            :to="link.to"
            class="hover:text-[#D9A65C] transition-colors duration-200"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <NuxtLink
        to="/#contact"
        class="hidden md:inline-flex items-center gap-2 bg-[#D9A65C] text-[#1E1424] text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#c99648] transition-colors duration-200"
      >
        <svg
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </svg>
        Book a Reading
      </NuxtLink>

      <button
        class="md:hidden text-2xl text-[#F7F1E8]"
        @click="toggleMenu"
      >
        <span v-if="!isMenuOpen">☰</span>
        <span v-else>✕</span>
      </button>
    </nav>

    <ul
      v-if="isMenuOpen"
      class="md:hidden flex flex-col gap-4 px-6 pb-6 text-sm text-[#E7DDD0] bg-[#1E1424] border-t border-white/10"
    >
      <li v-for="link in navLinks" :key="link.label">
        <NuxtLink
          :to="link.to"
          class="block py-1"
          @click="isMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </header>
</template>

